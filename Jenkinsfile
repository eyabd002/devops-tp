pipeline {
    agent any
    
    environment {
        IMAGE = "dsreact"
        CONTAINER = "dsreact-test"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set PORT') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        PORT = "3000"
                    } else if (env.BRANCH_NAME == 'dev') {
                        PORT = "3001"
                    } else {
                        PORT = "3002"
                    }
                    echo "Selected PORT: ${PORT}"
                }
            }
        }

        stage('Skip Feature Branches') {
            when {
                branch 'feature-ui'
            }
            steps {
                echo "Skipping heavy stages for feature-ui branch"
            }
        }

        stage('Install & Build') {
            when {
                not { branch 'feature-ui' }
            }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "docker build -t ${IMAGE}-${BRANCH_NAME} ."
            }
        }

        stage('Run Container (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "docker stop ${CONTAINER}-${BRANCH_NAME} || exit 0"
                bat "docker rm ${CONTAINER}-${BRANCH_NAME} || exit 0"
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER}-${BRANCH_NAME} ${IMAGE}-${BRANCH_NAME}"
            }
        }

        stage('Smoke Test (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'master') {
                    echo "🚀 Master deployment kept running"
                } else if (env.BRANCH_NAME == 'dev') {
                    echo "🧹 Cleaning dev container..."
                    bat "docker stop ${CONTAINER}-dev || exit 0"
                    bat "docker rm ${CONTAINER}-dev || exit 0"
                } else {
                    echo "🔹 Feature branch skip confirmed"
                }
            }
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }

        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
