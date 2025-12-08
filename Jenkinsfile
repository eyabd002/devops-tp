pipeline {
    agent any

    environment {
        PORT = ''                              // dynamic set later
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
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
                    if (BRANCH_NAME == 'master') {
                        PORT = '3000'
                    } else if (BRANCH_NAME == 'dev') {
                        PORT = '3001'
                    } else if (BRANCH_NAME.startsWith('feature')) {
                        PORT = '3002'
                    } else {
                        PORT = '3009'   // safe fallback
                    }
                    echo "🌍 Selected PORT = ${PORT}"
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
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
                    bat "docker build -t ${IMAGE} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    bat "docker stop ${CONTAINER} || exit 0"
                    bat "docker rm ${CONTAINER} || exit 0"
                    bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    bat "ping 127.0.0.1 -n 6 >nul"
                    bat """
                        echo 🔍 Checking http://localhost:${PORT}
                        curl -I http://localhost:${PORT}
                    """
                }
            }
        }

        stage('Skip Feature Branches') {
            when {
                expression { !BRANCH_NAME.startsWith('feature') }
            }
            steps {
                echo "🚫 Not a feature branch → continuing"
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch "dev"
            }
            steps {
                archiveArtifacts artifacts: 'dist/**'
            }
        }

    } // end stages

    post {
        always {
            echo "🧹 Cleaning containers..."
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✅ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
