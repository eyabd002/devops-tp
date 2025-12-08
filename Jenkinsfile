pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                script {
                    def imageName = "dsreact-${env.BRANCH_NAME}"
                    bat "docker build -t ${imageName} ."
                }
            }
        }

        stage('Run Container (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                script {
                    def imageName = "dsreact-${env.BRANCH_NAME}"
                    def containerName = "dsreact-${env.BRANCH_NAME}"
                    
                    bat "docker stop ${containerName} || exit 0"
                    bat "docker rm ${containerName} || exit 0"
                    bat "docker run -d -p 3000:3000 --name ${containerName} ${imageName}"
                }
            }
        }

        stage('Smoke Test (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                bat 'curl http://localhost:3000'
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature') {
            when {
                not {
                    anyOf { branch 'master'; branch 'dev' }
                }
            }
            steps {
                echo "Feature branches skip build & docker steps."
            }
        }
    }

    post {
        always {
            script {
                def containerName = "dsreact-${env.BRANCH_NAME}"
                bat "docker stop ${containerName} || exit 0"
                bat "docker rm ${containerName} || exit 0"
            }
            echo "🧹 Cleanup completed"
        }
        success {
            echo "🟢 SUCCESS for ${env.
