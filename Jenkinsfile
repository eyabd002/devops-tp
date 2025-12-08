pipeline {
    agent any

    environment {
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
                    if (BRANCH_NAME == "master") {
                        env.PORT = "3000"
                    } else if (BRANCH_NAME == "dev") {
                        env.PORT = "3001"
                    } else if (BRANCH_NAME.startsWith("feature")) {
                        env.PORT = "3002"
                    } else {
                        env.PORT = "3009"
                    }

                    echo "🌍 Running ${BRANCH_NAME} on PORT ${env.PORT}"
                }
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 npm install + build"
                bat """
                    npm install
                    npm run build
                """
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker image: ${env.IMAGE}"
                bat "docker build -t ${env.IMAGE} ."
            }
        }

        stage('Run Container') {
            steps {
                echo "▶️ Running container ${env.CONTAINER}"
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
                    echo "🧪 Checking http://localhost:${env.PORT}"
                    def healthy = false

                    for (int i = 1; i <= 10; i++) {
                        echo "Attempt ${i}/10..."
                        def response = bat(
                            script: "curl -I http://localhost:${env.PORT}",
                            returnStatus: true
                        )

                        if (response == 0) {
                            echo "🎯 Application UP on ${env.PORT}"
                            healthy = true
                            break
                        }

                        sleep(time: 3, unit: "SECONDS")
                    }

                    if (!healthy) {
                        error "❌ App never responded on port ${env.PORT}"
                    }
                }
            }
        }

        stage('Archive Build (dev only)') {
            when { branch "dev" }
            steps {
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }

    post {
        always {
            echo "🧹 Cleanup containers..."
            bat "docker stop ${env.CONTAINER} || exit 0"
            bat "docker rm ${env.CONTAINER} || exit 0"
        }
        success {
            echo "🟢 SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "🔴 FAILED for ${BRANCH_NAME}"
        }
    }
}
