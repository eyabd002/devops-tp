pipeline {
    agent any

    environment {
        IMAGE_NAME = "dsreact"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
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
                bat "docker build -t ${IMAGE_NAME}-${BRANCH_NAME} ."
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
                bat "docker stop ${IMAGE_NAME}-${BRANCH_NAME} || exit 0"
                bat "docker rm ${IMAGE_NAME}-${BRANCH_NAME} || exit 0"
                bat "docker run -d -p 3000:80 --name ${IMAGE_NAME}-${BRANCH_NAME} ${IMAGE_NAME}-${BRANCH_NAME}"
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
                bat "curl -I http://localhost:3000"
            }
        }

        stage('Skip Feature') {
            when {
                not {
                    anyOf {
                        branch 'dev'
                        branch 'master'
                    }
                }
            }
            steps {
                echo "Skipping build steps on feature branches"
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

        stage('Deploy to Production (master only)') {
            when {
                branch 'master'
            }
            steps {
                echo "Deploying production container..."
                bat "docker stop ${IMAGE_NAME}-prod || exit 0"
                bat "docker rm ${IMAGE_NAME}-prod || exit 0"
                bat "docker run -d -p 80:80 --name ${IMAGE_NAME}-prod ${IMAGE_NAME}-master"
            }
        }
    }

    post {
        always {
            echo "Cleaning containers..."
            bat "docker stop ${IMAGE_NAME}-${BRANCH_NAME} || exit 0"
            bat "docker rm ${IMAGE_NAME}-${BRANCH_NAME} || exit 0"
        }
        success {
            echo "✅ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
