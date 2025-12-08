pipeline {
    agent any

    environment {
        CONTAINER = "dsreact-${BRANCH_NAME}"
        IMAGE = "dsreact-dev"
    }

    stages {

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Set PORT') {
            steps {
                script {
                    PORT = (env.BRANCH_NAME == 'master') ? "3000" : "3001"
                    echo "Selected PORT = ${PORT}"
                }
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

        stage('Docker Build') {
            when {
                not { branch 'feature-ui' }
            }
            steps {
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container (dev + master)') {
            when {
                anyOf { branch 'dev'; branch 'master' }
            }
            steps {
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
            }
        }

        stage('Smoke Test (dev only)') {
            when { branch 'dev' }
            steps {
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:3001"
            }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when { branch 'feature-ui' }
            steps {
                echo "Skipping heavy steps for feature branch"
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'master') {
                    echo "🚀 Deployment SUCCESSFUL on master — container remains running."
                } else {
                    echo "🧹 Cleaning containers for non-master..."
                    bat "docker stop ${CONTAINER} || exit 0"
                    bat "docker rm ${CONTAINER} || exit 0"
                }
            }
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }

        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
            bat "docker logs ${CONTAINER} || exit 0"
        }
    }
}
