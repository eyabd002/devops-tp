pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t dsreact-${env.BRANCH_NAME} ."
            }
        }

        stage('Run Container') {
            steps {
                sh "docker stop dsreact-${env.BRANCH_NAME} || true"
                sh "docker rm dsreact-${env.BRANCH_NAME} || true"
                sh "docker run -d -p 3000:3000 --name dsreact-${env.BRANCH_NAME} dsreact-${env.BRANCH_NAME}"
            }
        }

        stage('Smoke Test') {
            steps {
                sh "sleep 5"
                sh "curl -I http://localhost:3000"
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**'
            }
        }
    }

    post {
        always {
            sh "docker stop dsreact-${env.BRANCH_NAME} || true"
            sh "docker rm dsreact-${env.BRANCH_NAME} || true"
            echo "Pipeline finished for ${env.BRANCH_NAME}"
        }
    }
}
