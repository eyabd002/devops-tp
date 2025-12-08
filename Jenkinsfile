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

        stage('Install (all branches)') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build (all branches)') {
            steps {
                sh 'npm run build'
                echo "✔ Build completed for ${env.BRANCH_NAME}"
            }
        }

        stage('Docker Build & Run (dev + master only)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker build -t dsreact-app .'
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

        stage('Archive (dev only)') {
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
        success { echo "✔ SUCCESS ${env.BRANCH_NAME}" }
        failure { echo "❌ FAILED ${env.BRANCH_NAME}" }
    }
}
