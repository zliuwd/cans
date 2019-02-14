//TODO: remove this pipeline file and use main Jenkins file when Prod Jenkins will support shared Jenkins library
JENKINS_MANAGEMENT_DOCKER_REGISTRY_CREDENTIALS_ID = '3ce810c0-b697-4ad1-a1b7-ad656b99686e'

switch(env.BUILD_JOB_TYPE) {
  case "regressionStaging": buildRegression('staging','https://staging.cwds.ca.gov/cans'); break;
  case "regressionPreprod": buildRegression('preprod','https://preprod.cwds.ca.gov/cans'); break;
  default: buildRegression('staging','https://staging.cwds.ca.gov/cans');
}

def buildRegression(nodeName, url) {
  node(nodeName) {
    try {
      checkoutStage()
      regressionTestStage(url)
    } catch(Exception exception) {
      currentBuild.result = "FAILURE"
      throw exception
    } finally {
      cleanupStage()
    }
  }
}

def checkoutStage() {
  stage('Checkout') {
    deleteDir()
    checkout scm
  }
}

def regressionTestStage(url) {
  stage('Regression Test') {
    withDockerRegistry([credentialsId: JENKINS_MANAGEMENT_DOCKER_REGISTRY_CREDENTIALS_ID]) {
      withCredentials([
        string(credentialsId: 'cans-supervisor-username', variable: 'SUPERVISOR_USERNAME'),
        string(credentialsId: 'cans-supervisor-password', variable: 'SUPERVISOR_PASSWORD'),
        string(credentialsId: 'cans-supervisor-verification-code', variable: 'SUPERVISOR_VERIFICATION_CODE'),
        string(credentialsId: 'cans-caseworker-username', variable: 'CASEWORKER_USERNAME'),
        string(credentialsId: 'cans-caseworker-password', variable: 'CASEWORKER_PASSWORD'),
        string(credentialsId: 'cans-caseworker-verification-code', variable: 'CASEWORKER_VERIFICATION_CODE'),
        string(credentialsId: 'cans-non-caseworker-username', variable: 'NON_CASEWORKER_USERNAME'),
        string(credentialsId: 'cans-non-caseworker-password', variable: 'NON_CASEWORKER_PASSWORD'),
        string(credentialsId: 'cans-non-caseworker-verification-code', variable: 'NON_CASEWORKER_VERIFICATION_CODE'),
      ]) {
        sh "docker-compose -f docker-compose.ci.yml up -d --build cans-test"
        try {
          sh "docker-compose -f docker-compose.ci.yml exec -T --env NON_CASEWORKER_USERNAME=$NON_CASEWORKER_USERNAME --env NON_CASEWORKER_PASSWORD=$NON_CASEWORKER_PASSWORD --env NON_CASEWORKER_VERIFICATION_CODE=$NON_CASEWORKER_VERIFICATION_CODE --env SUPERVISOR_USERNAME=$SUPERVISOR_USERNAME --env SUPERVISOR_PASSWORD=$SUPERVISOR_PASSWORD --env SUPERVISOR_VERIFICATION_CODE=$SUPERVISOR_VERIFICATION_CODE --env CASEWORKER_USERNAME=$CASEWORKER_USERNAME --env CASEWORKER_PASSWORD=$CASEWORKER_PASSWORD --env CASEWORKER_VERIFICATION_CODE=$CASEWORKER_VERIFICATION_CODE --env PROD_LOGIN=true --env CANS_WEB_BASE_URL=${url} cans-test bundle exec rspec spec/regression --format html --out regression-report/index.html"
        } finally {
          publishHTML([
                  allowMissing         : true,
                  alwaysLinkToLastBuild: true,
                  keepAll              : true,
                  reportDir            : 'regression-report',
                  reportFiles          : 'index.html',
                  reportName           : 'Regression Tests Report',
                  reportTitles         : 'Regression Tests Report'
          ])
        }
      }
    }

  }
}

def cleanupStage() {
  stage('Cleanup') {
    sh "docker-compose -f docker-compose.ci.yml down -v"
    cleanWs()
  }
}
