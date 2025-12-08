pipeline {
    agent any

    options {
        skipDefaultCheckout()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            when { anyOf { branch 'dev'; branch 'master'; branch 'feature-ui' } }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build (dev + master only)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker build -t dsreact-app .'
            }
        }

        stage('Run Container (dev only)') {
            when { branch 'dev' }
            steps {
                sh 'docker stop dsreact-test || true'
                sh 'docker rm dsreact-test || true'
                sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
            }
        }

        stage('Smoke Test (dev only)') {
            when { branch 'dev' }
            steps {
                sh '''
                    sleep 8
                    curl -I http://localhost:3000 || exit 1
                '''
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
        success { echo "✔ Pipeline SUCCESS for ${env.BRANCH_NAME}" }
        failure { echo "❌ Pipeline FAILED for ${env.BRANCH_NAME}" }
    }
}
