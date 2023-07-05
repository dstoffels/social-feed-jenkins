pipeline {
    agent any

    environment{
        def nodejsTool = tool name: 'node-20-tool', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
        def dockerTool = tool name: 'docker-latest-tool', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
        PATH = "${nodejsTool}/bin:${dockerTool}/bin:${env.PATH}"
    }

    stages{
        stage("Install Deps"){
            steps{
                sh "npm i"
            }
        }

        stage("React Build"){
            steps{
                sh "npm run-script build"
            }
        }

        stage("Docker Build") {
            steps{
                sh """
                docker build -t dstoffels/social-feed-jenkins:$BUILD_NUMBER .
                docker images
                """
            }
        }

        stage("Push Image"){
            steps{
                withCredentials([usernamePassword(credentialsId: 'personal-docker-credentials', usernameVariable: "DOCKER_USERNAME", passwordVariable: "DOCKER_PASSWORD")]) {
                    sh """
                    docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
                    docker push dstoffels/social-feed-jenkins:$BUILD_NUMBER
                    docker tag dstoffels/social-feed-jenkins:$BUILD_NUMBER dstoffels/social-feed-jenkins:latest
                    docker push dstoffels/social-feed-jenkins:latest
                    """
                }
            }
        }

        stage("Deploy") {
            steps{
                sshagent(['key-ssh-credentials']) {
                    sh """
                    SSH="ssh -o StrictHostKeyChecking=no ubuntu@3.138.114.212"
                    \$SSH "docker stop social-feed && docker rm social-feed"
                    \$SSH "docker pull dstoffels/social-feed-jenkins:$BUILD_NUMBER"
                    \$SSH "docker run -d p 80:80 --name social-feed dstoffels/social-feed-jenkins:$BUILD_NUMBER"
                    """
                }
            }
        }
    }
}