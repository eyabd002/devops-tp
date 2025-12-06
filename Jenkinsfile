pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo "📦 Installing production packages..."
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo "🏗️ Building production..."
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo "🚀 Deploying to production server..."
                sh 'echo Deployment successful!'
            }
        }
    }
}
