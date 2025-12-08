pipeline {
    agent any

    environment {
        IMAGE_NAME = "dsreact-${BRANCH_NAME}"
        CONTAINER_NAME = "dsreact-${BRANCH_NAME}"
    }

    stages {

        stage('Set PORT') {
            steps {
                script {
                    if (env.BRANCH_NAME == "master") {
                        env.PORT = "3000"
                    } else if (env.BRANCH_NAME == "dev") {
                        env.PORT = "3001"
                    } else {
                        env.PORT = "0"   // feature -> no deploy
                    }
                    echo "Selected PORT = ${env.PORT}"
                }
            }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install & Build') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Container') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "docker stop ${CONTAINER_NAME} || exit 0"
                bat "docker rm ${CONTAINER_NAME} || exit 0"

                bat """
                docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }

        stage('Smoke Test') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "ping 127.0.0.1 -n 6 > nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when {
                not { anyOf { branch 'dev'; branch 'master' } }
            }
            steps {
                echo "Skipping deploy for feature branch: ${BRANCH_NAME}"
            }
        }
    }

    post {
        always {
            echo "Cleaning containers..."
            bat "docker stop ${CONTAINER_NAME} || exit 0"
            bat "docker rm ${CONTAINER_NAME} || exit 0"
        }
        success { echo "✔ SUCCESS for ${BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${BRANCH_NAME}" }
    }
}
