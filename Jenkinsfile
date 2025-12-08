pipeline {
    agent any

    environment {
        BRANCH = "${env.BRANCH_NAME}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set ENV & PORT') {
            steps {
                script {
                    // Dynamic PORT per branch
                    def PORT_MAP = [
                        "master": "3000",
                        "dev": "3001",
                        "feature-ui": "3002"
                    ]

                    PORT = PORT_MAP.get(BRANCH, "3005")   // fallback
                    CONTAINER = "dsreact-${BRANCH}"
                    IMAGE = "dsreact-${BRANCH}"

                    echo "🌍 Branch: ${BRANCH}"
                    echo "🔌 Selected PORT: ${PORT}"
                }
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 Installing & Building for ${BRANCH}"
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Docker build for ${BRANCH}"
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "🚀 Running container on port ${PORT}"
                script {
                    bat "docker stop ${CONTAINER} || exit 0"
                    bat "docker rm ${CONTAINER} || exit 0"
                    // FIXED → map HOST_PORT : 80
                    bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                echo "🔥 Smoke testing http://localhost:${PORT}"
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev only)') {
            when { branch "dev" }
            steps {
                echo "🗄 Archiving /dist for dev branch"
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning containers..."
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✔ SUCCESS 🎉 Pipeline OK for ${BRANCH}"
        }
        failure {
            echo "❌ FAILED ❗ Pipeline crashed on ${BRANCH}"
        }
    }
}
