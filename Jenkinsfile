pipeline {
    agent any
    options { skipDefaultCheckout() }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install & Build (dev only)') {
            when { branch 'dev' }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build (dev + master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker build -t dsreact-app-${env.BRANCH_NAME} .'
            }
        }

        stage('Run Container (dev + master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh "docker rm -f dsreact-${env.BRANCH_NAME} || true"
                sh "docker run -d -p 3000:80 --name dsreact-${env.BRANCH_NAME} dsreact-app-${env.BRANCH_NAME}"
            }
        }

        stage('Smoke Test (dev only)') {
            when { branch 'dev' }
            steps { sh 'curl -I http://localhost:3000' }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps { archiveArtifacts artifacts: 'dist/**/*.*', fingerprint: true }
        }

        stage('Skip Feature') {
            when { not { anyOf { branch 'dev'; branch 'master' } } }
            steps { echo "No CI for feature branches" }
        }
    }

    post {
        always {
            sh "docker rm -f dsreact-${env.BRANCH_NAME} || true"
        }
        success { echo "✔ SUCCESS for ${env.BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${env.BRANCH_NAME}" }
    }
}
