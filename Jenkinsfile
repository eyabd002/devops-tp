pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
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
                sh 'docker build -t dsreact-app .'
            }
        }

        stage('Run Container (dev + master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker stop dsreact-test || true'
                sh 'docker rm dsreact-test || true'
                sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
            }
        }

        stage('Smoke Test (dev only)') {
            when { branch 'dev' }
            steps {
                sh 'curl -I http://localhost:3000'
            }
        }

        stage('Skip Feature Branches') {
            when { not { anyOf { branch 'dev'; branch 'master' } } }
            steps {
                echo "✨ Feature branch detected: no CI/CD run"
            }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**/*.*', fingerprint: true
            }
        }
    }

    post {
        always {
            sh 'docker stop dsreact-test || true'
            sh 'docker rm dsreact-test || true'
        }
        success { echo "✔ SUCCESS for ${env.BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${env.BRANCH_NAME}" }
    }
}
