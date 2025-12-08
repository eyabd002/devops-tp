pipeline {
    agent any

    stages {

        stage('Install & Build') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "docker build -t dsreact-${env.BRANCH_NAME} ."
            }
        }

        stage('Run Container') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "docker stop dsreact-${env.BRANCH_NAME} || exit 0"
                bat "docker rm dsreact-${env.BRANCH_NAME} || exit 0"
                bat "docker run -d -p 3000:3000 --name dsreact-${env.BRANCH_NAME} dsreact-${env.BRANCH_NAME}"
            }
        }

        stage('Smoke Test') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat 'curl http://localhost:3000'
            }
        }

        stage('Archive Build') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when {
                not {
                    anyOf {
                        branch 'dev'
                        branch 'master'
                    }
                }
            }
            steps {
                echo "Feature branch -> skipping heavy pipeline"
            }
        }
    }

    post {
        always {
            bat "docker stop dsreact-${env.BRANCH_NAME} || exit 0"
            bat "docker rm dsreact-${env.BRANCH_NAME} || exit 0"
            echo "STATUS: ${env.BRANCH_NAME} build finished"
        }
    }
}
