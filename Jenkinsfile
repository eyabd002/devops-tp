pipeline {
    agent any

    environment {
        PORT = "${BRANCH_NAME == 'master' ? '3000' : (BRANCH_NAME == 'dev' ? '3001' : '3002')}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
        IMAGE = "dsreact:${BRANCH_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install & Build') {
            steps {
                echo "📦 npm install + build"
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            steps {
                echo "🐳 Building Docker image ${IMAGE}"
                bat "docker build -t ${IMAGE} ."
            }
        }

stage('Run Container') {
    steps {
        echo "🚀 Running container for ${BRANCH_NAME}"
        bat "docker stop ${CONTAINER} || exit 0"
        bat "docker rm ${CONTAINER} || exit 0"
        bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
    }
}


        stage('Smoke Test') {
            steps {
                echo "🧪 Checking http://localhost:${PORT}"
                script {
                    def ok = false
                    for (int i = 1; i <= 10; i++) {
                        echo "Attempt ${i}/10..."
                        if (bat(returnStatus: true, script: "curl -I http://localhost:${PORT}") == 0) {
                            ok = true
                            break
                        }
                        sleep 3
                    }
                    if (!ok) error "❌ App never responded on ${PORT}"
                }
            }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleanup"
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
    }
}
