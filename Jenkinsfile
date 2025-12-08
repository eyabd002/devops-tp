pipeline {
    agent any

    environment {
        PORT = "${BRANCH_NAME == 'master' ? '3000' : (BRANCH_NAME == 'dev' ? '3001' : '3002')}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
        IMAGE = "dsreact:${BRANCH_NAME}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 npm install + build for ${BRANCH_NAME}"
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker Image: ${IMAGE}"
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "🚀 Running container ${CONTAINER} on port ${PORT}"

                // stop / remove if exist
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"

                // Always map HOST:PORT -> CONTAINER:80 because nginx serves on port 80
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
            }
        }

        stage('Smoke Test') {
            steps {
                echo "🧪 Testing http://localhost:${PORT}"
                script {
                    def retries = 10
                    def success = false

                    for (int i = 1; i <= retries; i++) {
                        echo "Attempt ${i}/${retries}..."
                        def result = bat(returnStatus: true, script: "curl -I http://localhost:${PORT}")

                        if (result == 0) {
                            echo "✔ App responded OK"
                            success = true
                            break
                        }
                        sleep 3
                    }

                    if (!success) {
                        error "❌ App never responded on port ${PORT}"
                    }
                }
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                echo "🗂 Archiving dist/* for dev branch"
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning container..."
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
