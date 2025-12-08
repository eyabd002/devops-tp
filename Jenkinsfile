pipeline {
    agent any

    environment {
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
        PORT = BRANCH_NAME == 'master' ? '3000' : (BRANCH_NAME == 'dev' ? '3001' : '3002')
    }

    stages {

        stage('Checkout SCM') {
            steps { checkout scm }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Set PORT') {
            steps {
                echo "Selected PORT = ${PORT}"
            }
        }

        stage('Install & Build') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
            }
        }

        stage('Smoke Test') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev & master only)') {
            when { expression { return BRANCH_NAME == 'dev' || BRANCH_NAME == 'master' } }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

    }

    post {
        always {
            echo "Cleaning containers..."
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
