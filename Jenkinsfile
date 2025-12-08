pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { git branch: 'dev', url: 'https://github.com/eyabd002/devops-tp.git' }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps { sh 'docker build -t dsreact-app .' }
        }

        stage('Run Container & Test') {
            steps {
                sh 'docker run -d -p 3000:80 --name dsreact dsreact-app'
                sh 'curl -I http://localhost:3000'
            }
        }

        stage('Archive') {
            steps { archiveArtifacts artifacts: 'dist/**/*.*' }
        }
    }

    post {
        always {
            sh 'docker stop dsreact || true'
            sh 'docker rm dsreact || true'
        }
    }
}
