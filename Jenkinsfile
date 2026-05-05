pipeline {
    agent any

    stages {

        stage('Build Images') {
            steps {
                sh """
                docker build -t rahul-construction-backend:${BUILD_NUMBER} ./construction-backend
                docker tag rahul-construction-backend:${BUILD_NUMBER} rahul-construction-backend:latest

                docker build -t rahul-construction-frontend:${BUILD_NUMBER} ./construction-frontend
                docker tag rahul-construction-frontend:${BUILD_NUMBER} rahul-construction-frontend:latest
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker-compose -f docker-compose.yml -p rahul down || true
                docker-compose -f docker-compose.yml -p rahul up -d
                """
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
