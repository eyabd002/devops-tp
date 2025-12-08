# ----- BUILD STAGE -----
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ----- SERVE STAGE -----
FROM nginx:stable

# add custom nginx routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# deploy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
