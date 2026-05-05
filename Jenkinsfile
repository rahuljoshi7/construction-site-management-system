pipeline {
    agent any

    stages {

        stage('Build Images') {
            steps {
<<<<<<< HEAD
                sh """
                docker build -t rahul-construction-backend:${BUILD_NUMBER} ./construction-backend
                docker tag rahul-construction-backend:${BUILD_NUMBER} rahul-construction-backend:latest

                docker build -t rahul-construction-frontend:${BUILD_NUMBER} ./construction-frontend
                docker tag rahul-construction-frontend:${BUILD_NUMBER} rahul-construction-frontend:latest
                """
=======
                script {
                    if (isUnix()) {
                        sh """
                        docker build -t rahul-construction-backend:${BUILD_NUMBER} ./construction-backend
                        docker tag rahul-construction-backend:${BUILD_NUMBER} rahul-construction-backend:latest

                        docker build -t rahul-construction-frontend:${BUILD_NUMBER} ./construction-frontend
                        docker tag rahul-construction-frontend:${BUILD_NUMBER} rahul-construction-frontend:latest
                        """
                    } else {
                        bat """
                        docker build -t rahul-construction-backend:%BUILD_NUMBER% .\\construction-backend
                        docker tag rahul-construction-backend:%BUILD_NUMBER% rahul-construction-backend:latest

                        docker build -t rahul-construction-frontend:%BUILD_NUMBER% .\\construction-frontend
                        docker tag rahul-construction-frontend:%BUILD_NUMBER% rahul-construction-frontend:latest
                        """
                    }
                }
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
            }
        }

        stage('Deploy') {
            steps {
<<<<<<< HEAD
                sh """
                docker-compose -f docker-compose.yml -p rahul down || true
                docker-compose -f docker-compose.yml -p rahul up -d
                """
=======
                script {
                    if (isUnix()) {
                        sh """
                        docker compose -f docker-compose.yml -p rahul down || true
                        docker compose -f docker-compose.yml -p rahul up -d
                        """
                    } else {
                        bat """
                        docker compose -f docker-compose.yml -p rahul down
                        docker compose -f docker-compose.yml -p rahul up -d
                        """
                    }
                }
>>>>>>> 78e9583c7956c4b4b9af980d8c6e7133c70fcc21
            }
        }
    }

    post {
        failure {
            echo "Build or deployment failed!"
        }
        success {
            echo "Deployment successful!"
        }
    }
}
