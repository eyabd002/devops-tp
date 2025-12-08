pipeline {
    agent any

    environment {
        APP_NAME = "dsreact"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Set PORT') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        PORT = "3000"
                        CONTAINER = "${APP_NAME}-test"
                        IMAGE = "${APP_NAME}-test"
                    } else if (env.BRANCH_NAME == 'dev') {
                        PORT = "3001"
                        CONTAINER = "${APP_NAME}-dev"
                        IMAGE = "${APP_NAME}-dev"
                    } else {
                        PORT = "3002"
                        CONTAINER = "${APP_NAME}-feature"
                        IMAGE = "${APP_NAME}-feature"
                    }
                    echo "Selected PORT = ${PORT}"
                }
            }
        }

        /* BUILD ALWAYS FOR ALL BRANCHES */
        stage('Install & Build') {
            steps {
                echo "📦 Installing & Building for ${BRANCH_NAME}"
                bat "npm install"
                bat "npm run build"
            }
        }

        /* DOCKER FOR ALL BRANCHES (NOW INCLUDING FEATURE) */
        stage('Docker Build') {
            steps {
                echo "🐳 Docker build for ${BRANCH_NAME}"
                bat "docker build -t ${IMAGE} ."
            }
        }

        /* RUN ALL BRANCHES */
        stage('Run Container') {
            steps {
                echo "🚀 Running container for ${BRANCH_NAME}"
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"
                bat "docker run -d -p ${PORT}:3000 --name ${CONTAINER} ${IMAGE}"
            }
        }

        /* SMOKE TEST ALL BRANCHES */
        stage('Smoke Test') {
            steps {
                echo "🔍 Smoke testing http://localhost:${PORT}"
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        /* ONLY DEV ARCHIVES */
        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                echo "📦 Archiving dist/ for dev branch"
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning containers..."
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }
    }
}
