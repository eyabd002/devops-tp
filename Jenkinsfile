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

        stage('Feature Branch Skip') {
            when { not { anyOf { branch 'dev'; branch 'master' } } }
            steps {
                echo "✨ Feature branch: CI build skipped"
                script { currentBuild.result = 'SUCCESS' }
            }
        }

        stage('Install & Build') {
            when { branch 'dev' }
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker build -t dsreact-app .'
            }
        }

        stage('Run Container') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                sh 'docker stop dsreact-test || true'
                sh 'docker rm dsreact-test || true'
                sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
            }
        }

        stage('Smoke Test') {
            when { branch 'dev' }
            steps {
                timeout(time: 30, unit: 'SECONDS') {
                    sh '''
                        sleep 5
                        curl -I http://localhost:3000 || exit 1
                    '''
                }
            }
        }

        stage('Archive Build') {
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
