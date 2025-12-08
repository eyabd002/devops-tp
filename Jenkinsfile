pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t dsreact-%BRANCH_NAME% ."
            }
        }

        stage('Run Container') {
            steps {
                bat "docker stop dsreact-%BRANCH_NAME% || exit 0"
                bat "docker rm dsreact-%BRANCH_NAME% || exit 0"
                bat "docker run -d -p 3000:3000 --name dsreact-%BRANCH_NAME% dsreact-%BRANCH_NAME%"
            }
        }

        stage('Smoke Test') {
            steps {
                bat "timeout 5"
                bat "curl -I http://localhost:3000"
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            bat "docker stop dsreact-%BRANCH_NAME% || exit 0"
            bat "docker rm dsreact-%BRANCH_NAME% || exit 0"
            echo "Pipeline finished for %BRANCH_NAME%"
        }
    }
}
