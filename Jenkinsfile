pipeline {
    agent any

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Set ENV') {
            steps {
                script {
                    // Declare instead of assigning directly (avoids memory leak warning)
                    def port
                    def image
                    def container

                    if (BRANCH_NAME == 'master') {
                        port = "3000"
                    } else if (BRANCH_NAME == 'dev') {
                        port = "3001"
                    } else if (BRANCH_NAME.startsWith("feature")) {
                        port = "3002"
                    } else {
                        port = "3010"
                    }

                    image = "dsreact-${BRANCH_NAME}"
                    container = "dsreact-${BRANCH_NAME}"

                    // Export for later stages
                    env.PORT = port
                    env.IMAGE = image
                    env.CONTAINER = container

                    echo "🌍 ENV SET → BRANCH=${BRANCH_NAME} | PORT=${PORT} | IMAGE=${IMAGE} | CONTAINER=${CONTAINER}"
                }
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 Install & Build"
                bat """
                    npm install
                    npm run build
                """
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker Image: ${IMAGE}"
                bat """
                    docker build -t ${IMAGE} .
                """
            }
        }

        stage('Run Container') {
            steps {
                echo "▶️ Running container ${CONTAINER} on port ${PORT}"
                script {
                    bat "docker stop ${CONTAINER} || exit 0"
                    bat "docker rm ${CONTAINER} || exit 0"
                    // IMPORTANT: nginx always exposes port 80 internally
                    bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    echo "🧪 Checking http://localhost:${PORT}"

                    // Give it time before hitting health
                    bat "ping 127.0.0.1 -n 6 >nul"

                    // nginx health
                    bat """
                        echo 🔍 Curl HEAD Request
                        curl -I http://localhost:${PORT} || exit 1
                    """
                }
            }
        }

        stage('Skip Feature Branches') {
            when {
                not { branch pattern: "feature.*" }
            }
            steps {
                echo "ℹ️ Not a feature branch → continuing"
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch "dev"
            }
            steps {
                echo "📦 Archiving build artifacts"
                archiveArtifacts artifacts: 'dist/**'
            }
        }

    } // END STAGES

    post {
        always {
            echo "🧹 Cleanup containers"
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✅ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
