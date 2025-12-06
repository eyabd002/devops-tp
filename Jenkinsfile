pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                echo "📦 Installing packages..."
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                echo "🏗️ Building development environment..."
                sh 'npm run build'
            }
        }
        stage('Test (Optional)') {
            steps {
                echo "🧪 Running tests (if any)..."
                sh 'npm run test --if-present'
            }
        }
    }
}
