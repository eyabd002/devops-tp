pipeline {
    agent any

    environment {
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set PORT') {
            steps {
                script {
                    // dynamic and SAFE assignment
                    if (BRANCH_NAME == 'master') {
                        env.PORT = '3000'
                    } else if (BRANCH_NAME == 'dev') {
                        env.PORT = '3001'
                    } else if (BRANCH_NAME.startsWith('feature')) {
                        env.PORT = '3002'
                    } else {
                        env.PORT = '3010'  // fallback
                    }

                    echo "🌍 Running ${BRANCH_NAME} on PORT ${env.PORT}"
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
                    bat "docker build -t ${IMAGE} ."
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    bat "docker stop ${CONTAINER} || exit 0"
                    bat "docker rm ${CONTAINER} || exit 0"

                    // ALWAYS map external port to NGINX internal 80
                    bat "docker run -d -p ${env.PORT}:80 --name ${CONTAINER} ${IMAGE}"
                }
            }
        }

        stage('Smoke Test') {
            steps {
                script {
                    bat """
                        echo 🔍 Running Smoke Test on http://localhost:${env.PORT}

                        for /l %%x in (1,1,5) do (
                            echo Attempt %%x ...
                            curl -I http://localhost:${env.PORT} && exit 0
                            timeout /t 2 >nul
                        )

                        echo ❌ Application failed to respond on port ${env.PORT}
                        exit 1
                    """
                }
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
            echo "🧹 Cleanup containers"
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✅ SUCCESS for ${BRANCH_NAME} on PORT ${env.PORT}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
