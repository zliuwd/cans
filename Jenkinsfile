node('cans-slave') {
  def app
    try {
      deleteDir()
        stage('Checkout') {
          checkout scm
        }
      stage('Build Docker Image') {
        app = docker.build("cwds/cans:${env.BUILD_ID}", "-f docker/web/Dockerfile .")
      }
      app.withRun("-e CI=true") { container ->
        stage('Lint') {
          sh "docker exec -t ${container.id} rubocop"
        }
        stage('Unit Test') {
          sh "docker exec -t ${container.id} bash -c 'cd client && yarn test:coverage'"
          sh "docker exec -t ${container.id} rspec spec/routes"
        }
      }
      stage('Acceptance Test') {
        sh "docker-compose up -d --build"
        sh "sleep 120"
        sh "docker-compose exec -T --env CANS_AUTHORIZATION_ENABLED=true --env CANS_WEB_BASE_URL=cans-web:3000 cans-test bundle exec rspec spec/acceptance"
      }
    } catch(Exception e) {
      currentBuild.result = "FAILURE"
        throw e
    } finally {
      sh "docker-compose down"
      cleanWs()
    }
}
