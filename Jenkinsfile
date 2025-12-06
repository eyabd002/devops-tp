pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Setup') {
            steps { sh 'npm install' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
        stage('Run Docker') {
            steps {
                sh 'docker build -t dsreact-app .'
                sh 'docker run -d --name dsreact-container -p 5173:5173 dsreact-app'
            }
        }
        stage('Smoke Test') {
            steps { sh './smoke.sh > smoke.log' }
        }
        stage('Archive') {
            steps { archiveArtifacts artifacts: 'smoke.log', allowEmptyArchive: true }
        }
    }

    post {
        always {
            sh 'docker stop dsreact-container || true'
            sh 'docker rm dsreact-container || true'
        }
    }
}
