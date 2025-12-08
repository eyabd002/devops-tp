pipeline {
    agent any

    environment {
        IMAGE_NAME = "dsreact-${BRANCH_NAME}"
        CONTAINER_NAME = "dsreact-${BRANCH_NAME}"
        PORT = BRANCH_NAME == 'master' ? '3000' : '3001'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Container') {
            steps {
                // Stop old if exists
                bat "docker stop ${CONTAINER_NAME} || exit 0"
                bat "docker rm ${CONTAINER_NAME} || exit 0"

                // Run new
                bat """
                docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }

        stage('Smoke Test') {
            steps {
                // Wait container startup
                bat "ping 127.0.0.1 -n 6 > nul"

                // Check HTTP response
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when {
                not {
                    anyOf {
                        branch 'dev'
                        branch 'master'
                    }
                }
            }
            steps {
                echo "Skipping deploy for feature branch: ${BRANCH_NAME}"
            }
        }
    }

    post {
        always {
            echo "Cleaning..."
            bat "docker stop ${CONTAINER_NAME} || exit 0"
            bat "docker rm ${CONTAINER_NAME} || exit 0"
            echo "Pipeline finished for ${BRANCH_NAME}"
        }
    }
}
