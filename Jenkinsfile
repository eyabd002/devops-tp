pipeline {
    agent any

    environment {
        PORT = ""
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
    }

    stages {

        stage('Checkout SCM') {
            steps { checkout scm }
        }

        stage('Set PORT') {
            steps {
                script {
                    if (BRANCH_NAME == "master") {
                        PORT = "3000"
                    } else if (BRANCH_NAME == "dev") {
                        PORT = "3001"
                    } else if (BRANCH_NAME.startsWith("feature")) {
                        PORT = "3002"
                    } else {
                        PORT = "3009"
                    }
                    echo "🌍 Running ${BRANCH_NAME} on PORT ${PORT}"
                }
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 npm install + build"
                bat """
                    npm install
                    npm run build
                """
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker image ${IMAGE}"
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "🚀 Running container ${CONTAINER}"
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    echo "🔍 Checking http://localhost:${PORT}"
                    retry(8) {
                        sleep 3
                        bat "curl -I http://localhost:${PORT}"
                    }
                }
            }
        }

    }

    post {
        always {
            echo "🧹 Cleanup"
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success { echo "✅ SUCCESS for ${BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${BRANCH_NAME}" }
    }
}
