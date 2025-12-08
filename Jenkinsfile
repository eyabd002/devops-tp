pipeline {
    agent any

    environment {
        CONTAINER = "dsreact-test"
        IMAGE = "dsreact-test"
        PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 Installing dependencies"
                bat "npm install"
                echo "🏗 Building app"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker image"
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "🚀 Running container on port ${PORT}"
                bat """
                docker stop ${CONTAINER} || exit 0
                docker rm ${CONTAINER} || exit 0
                docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}
                """
            }
        }

        stage('Smoke Test') {
            steps {
                echo "⏳ Waiting app to start..."
                bat "ping 127.0.0.1 -n 8 > nul"

                echo "🔥 Checking /health endpoint"
                bat "curl -I http://localhost:${PORT}/health"
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning container"
            bat """
            docker stop ${CONTAINER} || exit 0
            docker rm ${CONTAINER} || exit 0
            """
        }
        success {
            echo "🎉 SUCCESS: App is UP & HEALTHY"
        }
        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
