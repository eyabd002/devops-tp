pipeline {
    agent any

    environment {
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
        PORT = ""   // set dynamically
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Set PORT') {
            steps {
                script {
                    def computedPort

                    if (BRANCH_NAME == 'master') {
                        computedPort = '3000'
                    } else if (BRANCH_NAME == 'dev') {
                        computedPort = '3001'
                    } else if (BRANCH_NAME.startsWith('feature')) {
                        computedPort = '3002'
                    } else {
                        computedPort = '3010'  // fallback
                    }

                    env.PORT = computedPort
                    echo "🌍 Selected PORT = ${env.PORT}"
                }
            }
        }

        stage('Install & Build') {
            steps {
                bat """
                  npm install
                  npm run build
                """
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    bat "docker build -t ${env.IMAGE} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    bat "docker stop ${env.CONTAINER} || exit 0"
                    bat "docker rm ${env.CONTAINER} || exit 0"
                    bat "docker run -d -p ${env.PORT}:80 --name ${env.CONTAINER} ${env.IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    bat "ping 127.0.0.1 -n 6 >nul"
                    bat """
                        echo 🔍 Checking http://localhost:${env.PORT}
                        curl -I http://localhost:${env.PORT}
                    """
                }
            }
        }

        stage('Archive Build (dev only)') {
            when { branch "dev" }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

    } // end stages

    post {
        always {
            echo "🧹 Cleaning containers..."
            bat "docker stop ${env.CONTAINER} || exit 0"
            bat "docker rm ${env.CONTAINER} || exit 0"
        }

        success {
            echo "✅ SUCCESS for ${BRANCH_NAME}"
        }

        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
