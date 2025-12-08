pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        CONTAINER_NAME = "dsreact-${env.BRANCH_NAME}"
        IMAGE_NAME = "dsreact-app-${env.BRANCH_NAME}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /* DEV ONLY: install + build + archive + smoke test */
        stage('Install & Build') {
            when { branch 'dev' }
            steps {
                bat 'npm install'
                bat 'npm run build'
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
                bat "docker run -d -p 3000:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}"
            }
        }

        stage('Smoke Test') {
            when { branch 'dev' }
            steps {
                bat 'curl http://localhost:3000'
            }
        }

        stage('Archive Build') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**/*.*', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when { not { anyOf { branch 'dev'; branch 'master' } } }
            steps {
                echo "✨ Feature branch detected → CI skipped"
            }
        }
    }

    post {
        always {
            bat "docker stop ${CONTAINER_NAME} || exit 0"
            bat "docker rm ${CONTAINER_NAME} || exit 0"
        }
        success {
            echo "✔ SUCCESS for ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${env.BRANCH_NAME}"
        }
    }
}
