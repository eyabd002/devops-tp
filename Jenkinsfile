pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Process by Branch') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        echo "Running Full CI on dev 🚀"
                        sh 'npm install'
                        sh 'npm run build'
                        sh 'docker build -t dsreact-app .'
                        sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
                        sh 'curl -I http://localhost:3000'
                    }
                    else if (env.BRANCH_NAME == 'master') {
                        echo "Deploying on master 📦"
                        sh 'docker build -t dsreact-app .'
                        sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
                    }
                    else {
                        echo "Feature branch detected: ${env.BRANCH_NAME} 💡"
                        echo "No build, no deploy, no docker."
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
            echo "Cleaning containers 🧹"
            sh 'docker stop dsreact-test || true'
            sh 'docker rm dsreact-test || true'
        }
        success {
            echo "✔ Pipeline completed: ${env.BRANCH_NAME}"
        }
        failure {
            echo "❌ Pipeline failed: ${env.BRANCH_NAME}"
        }
    }
}
