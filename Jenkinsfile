pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'dev', url: 'https://github.com/eyabd002/devops-tp.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build & Run') {
            steps {
                sh 'docker build -t dsreact-app .'
                sh 'docker run -d -p 3000:80 --name dsreact-test dsreact-app'
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    try {
                        sh 'curl -I http://localhost:3000'
                        echo "Smoke Test PASSED"
                    } catch (e) {
                        error "Smoke Test FAILED ❌"
                    }
                }
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*.*', fingerprint: true
            }
        }
    }

    post {
        success {
            echo "🎉 BUILD SUCCESS"
        }
        failure {
            echo "💥 BUILD FAILED"
        }
        always {
            sh 'docker stop dsreact-test || true'
            sh 'docker rm dsreact-test || true'
        }
    }
}
