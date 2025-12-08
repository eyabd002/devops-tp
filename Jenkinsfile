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
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build (dev + master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat 'docker build -t dsreact-app .'
            }
        }

        stage('Run Container (dev + master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat 'docker stop dsreact-test || exit 0'
                bat 'docker rm dsreact-test || exit 0'
                bat 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
            }
        }

        stage('Smoke Test (dev only)') {
            when { branch 'dev' }
            steps {
                bat 'curl -I http://localhost:3000'
            }
        }

        stage('Skip Feature') {
            when { not { anyOf { branch 'dev'; branch 'master' } } }
            steps {
                echo "✨ Feature branch detected: no CI/CD"
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
            bat 'docker stop dsreact-test || exit 0'
            bat 'docker rm dsreact-test || exit 0'
        }
        success { echo "✔ SUCCESS for ${env.BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${env.BRANCH_NAME}" }
    }
}
