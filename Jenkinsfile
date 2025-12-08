pipeline {
    agent any

    environment {
<<<<<<< HEAD
        IMAGE_NAME = "dsreact-${BRANCH_NAME}"
        CONTAINER_NAME = "dsreact-${BRANCH_NAME}"
=======
        IMAGE = "dsreact-${BRANCH_NAME}"
        CONTAINER = "dsreact-${BRANCH_NAME}"
        PORT = BRANCH_NAME == 'master' ? '3000' : (BRANCH_NAME == 'dev' ? '3001' : '3002')
>>>>>>> feature-ui
    }

    stages {

<<<<<<< HEAD
        stage('Set PORT') {
            steps {
                script {
                    if (env.BRANCH_NAME == "master") {
                        env.PORT = "3000"
                    } else if (env.BRANCH_NAME == "dev") {
                        env.PORT = "3001"
                    } else {
                        env.PORT = "0"   // feature -> no deploy
                    }
                    echo "Selected PORT = ${env.PORT}"
                }
            }
=======
        stage('Checkout SCM') {
            steps { checkout scm }
>>>>>>> feature-ui
        }

        stage('Checkout') {
            steps { checkout scm }
<<<<<<< HEAD
        }

        stage('Install & Build') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "docker build -t ${IMAGE_NAME} ."
            }
        }

        stage('Run Container') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "docker stop ${CONTAINER_NAME} || exit 0"
                bat "docker rm ${CONTAINER_NAME} || exit 0"

                bat """
                docker run -d -p ${PORT}:3000 --name ${CONTAINER_NAME} ${IMAGE_NAME}
                """
            }
        }

        stage('Smoke Test') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                bat "ping 127.0.0.1 -n 6 > nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev only)') {
            when { branch 'dev' }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when {
                not { anyOf { branch 'dev'; branch 'master' } }
            }
            steps {
                echo "Skipping deploy for feature branch: ${BRANCH_NAME}"
            }
        }
=======
        }

        stage('Set PORT') {
            steps {
                echo "Selected PORT = ${PORT}"
            }
        }

        stage('Install & Build') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "npm install"
                bat "npm run build"
            }
        }

        stage('Docker Build') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "docker stop ${CONTAINER} || exit 0"
                bat "docker rm ${CONTAINER} || exit 0"
                bat "docker run -d -p ${PORT}:80 --name ${CONTAINER} ${IMAGE}"
            }
        }

        stage('Smoke Test') {
            when { expression { return BRANCH_NAME.startsWith("feature") || BRANCH_NAME == "dev" || BRANCH_NAME == "master" } }
            steps {
                bat "ping 127.0.0.1 -n 6 >nul"
                bat "curl -I http://localhost:${PORT}"
            }
        }

        stage('Archive Build (dev & master only)') {
            when { expression { return BRANCH_NAME == 'dev' || BRANCH_NAME == 'master' } }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

>>>>>>> feature-ui
    }

    post {
        always {
            echo "Cleaning containers..."
<<<<<<< HEAD
            bat "docker stop ${CONTAINER_NAME} || exit 0"
            bat "docker rm ${CONTAINER_NAME} || exit 0"
        }
        success { echo "✔ SUCCESS for ${BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${BRANCH_NAME}" }
=======
            bat "docker stop ${CONTAINER} || exit 0"
            bat "docker rm ${CONTAINER} || exit 0"
        }
        success {
            echo "✔ SUCCESS for ${BRANCH_NAME}"
        }
        failure {
            echo "❌ FAILED for ${BRANCH_NAME}"
        }
>>>>>>> feature-ui
    }
}
pipeline {
    agent any

    environment {
        PORT = ''
        IMAGE = "dsreact-${BRANCH_NAME}"
    }

    stages {
        stage('Set PORT') {
            steps {
                script {
                    if (BRANCH_NAME == 'master') {
                        PORT = '3000'
                    } else if (BRANCH_NAME.startsWith('feature')) {
                        PORT = '3002'
                    } else {
                        PORT = '3001'
                    }
                    echo "Selected PORT = ${PORT}"
                }
            }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install & Build') {
            steps {
                bat 'npm install'
                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            when { anyOf { branch 'dev'; branch 'master'; expression { BRANCH_NAME.startsWith('feature') } } }
            steps {
                bat "docker build -t ${IMAGE} ."
            }
        }

        stage('Run Container') {
            when { anyOf { branch 'dev'; branch 'master'; expression { BRANCH_NAME.startsWith('feature') } } }
            steps {
                bat """
                docker stop ${IMAGE} || exit 0
                docker rm ${IMAGE} || exit 0
                docker run -d -p ${PORT}:3000 --name ${IMAGE} ${IMAGE}
                """
            }
        }

        stage('Smoke Test') {
            when { anyOf { branch 'dev'; branch 'master'; expression { BRANCH_NAME.startsWith('feature') } } }
            steps {
                bat """
                ping 127.0.0.1 -n 6 > nul
                curl -I http://localhost:${PORT}
                """
            }
        }

        stage('Archive Build (dev+master)') {
            when { anyOf { branch 'dev'; branch 'master' } }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Skip Feature Branches') {
            when { expression { BRANCH_NAME.startsWith('feature') } }
            steps {
                echo "Feature branch: no archiving needed"
            }
        }
    }

    post {
        always {
            echo "Cleaning containers..."
            bat "docker stop ${IMAGE} || exit 0"
            bat "docker rm ${IMAGE} || exit 0"
        }
        success { echo "✔ SUCCESS for ${BRANCH_NAME}" }
        failure { echo "❌ FAILED for ${BRANCH_NAME}" }
    }
}
