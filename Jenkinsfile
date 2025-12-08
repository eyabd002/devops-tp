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

        stage('CI Logic by Branch') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "🌿 DEV branch detected — running full CI"
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'docker build -t dsreact-app .'
                        sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
                        sh 'curl -I http://localhost:3000'
                    } 
                    else if (env.BRANCH_NAME == 'master') {
                        echo "🏁 MASTER branch detected — deployment only"
                        sh 'docker build -t dsreact-app .'
                        sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
                    } 
                    else {
                        echo "✨ Feature branch (${env.BRANCH_NAME}) — CI skipped"
                    }
                }
            }
        }

        stage('Archive Build') {
            when {
                branch 'dev'
            }
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
