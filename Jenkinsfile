pipeline {
    agent any

    environment {
        APP_NAME = "dsreact"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        /*
        ==========================================
        FEATURE BRANCH (BUILD + SMOKE TEST ONLY)
        ==========================================
        */
        stage('Feature Build & Test') {
            when {
                expression { env.BRANCH_NAME.startsWith("feature-") }
            }
            steps {
                echo "🚧 Feature branch detected — running build & smoke test only"

                bat "npm install"
                bat "npm run build"

                echo "Running temporary preview server..."
                bat "docker stop ${APP_NAME}-feat || exit 0"
                bat "docker rm ${APP_NAME}-feat || exit 0"
                bat "docker build -t ${APP_NAME}-feat ."
                bat "docker run -d -p 3002:3000 --name ${APP_NAME}-feat ${APP_NAME}-feat"

                echo "⏳ Waiting for service to start..."
                bat "ping 127.0.0.1 -n 7 >nul"

                echo "🔍 Smoke Test Request..."
                bat "curl -I http://localhost:3002"
            }
        }

        /*
        ==========================================
        DEV + MASTER FULL PIPELINE
        ==========================================
        */

        stage('Install & Build (dev + master only)') {
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

        stage('Docker Build (dev + master)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "docker build -t ${APP_NAME}-${BRANCH_NAME} ."
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
                bat "docker stop ${APP_NAME}-${BRANCH_NAME} || exit 0"
                bat "docker rm ${APP_NAME}-${BRANCH_NAME} || exit 0"
                bat "docker run -d -p 3000:3000 --name ${APP_NAME}-${BRANCH_NAME} ${APP_NAME}-${BRANCH_NAME}"
            }
        }

        stage('Smoke Test (dev + master only)') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                bat "ping 127.0.0.1 -n 7 >nul"
                bat "curl -I http://localhost:3000"
            }
        }

        stage('Archive Build (dev only)') {
            when {
                branch 'dev'
            }
            steps {
                archiveArtifacts artifacts: 'dist/**'
            }
        }
    }

    post {
        always {
            echo "Cleaning containers..."
            bat "docker stop ${APP_NAME}-feat || exit 0"
            bat "docker rm ${APP_NAME}-feat || exit 0"
            bat "docker stop ${APP_NAME}-${BRANCH_NAME} || exit 0"
            bat "docker rm ${APP_NAME}-${BRANCH_NAME} || exit 0"
        }
        success {
            echo "🎉 SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "💥 FAILED for ${BRANCH_NAME}"
        }
    }
}
