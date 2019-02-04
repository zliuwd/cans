# CANS

This README documents the steps necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# First Time Setup

Install Ruby 2.5.1 (Check the version specified in the .ruby-version file, in case this readme is stale).

Example instructions for `rbenv` installed through Homebrew on Mac:

```
brew update
brew upgrade rbenv
brew upgrade ruby-build
rbenv install 2.5.1
```

Install language-specific package dependencies

```
bundle install # Ruby gems
yarn install # Node modules
```

# Running the App

There are two primary ways of running the CANS app:

1. Running the CANS app and all dependencies locally using Docker, or...
2. Running only the CANS app and using an existing environment such as Preint as an API backend.

## Running with Preint

In order to run against Preint, create a `.env` file pointing to the CANS API and Perry in Preint:

```
AUTHENTICATION_ENABLED=true
CANS_API_BASE_URL=https://cansapi.preint.cwds.io
PERRY_BASE_URL=https://web.preint.cwds.io/perry
```

Then run Rails (`rails s`), Redis (`redis-server`), and the React server (`yarn start` or `./bin/webpack-dev-server`).
OR
Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CANS root folder. Please do not include the foreman gem in the Gemfile

## Running everything locally with Docker

You will need a full .env file for this.
An example can be found in the [CWDS env-store repo](https://github.com/ca-cwds/env-store/blob/master/envs/cans/.env),
or ask another developer.

Once you have your .env file, run Redis and CANS API through Docker. This will also run API dependencies such as Perry.

```docker-compose up redis cans-api```

Then run Rails (`rails s`) and the React server (`yarn start` or `./bin/webpack-dev-server`).

## Linting and Tests

To run the React test suite with watcher:

```yarn test```

and a one-time run with coverage

```yarn test:coverage```

Other commands:

```
yarn test:rspec # runs Rspec unit tests
yarn test:acceptance # runs acceptance tests, requires app to be running
yarn test:a11y # runs accessibility tests, requires app to be running
yarn lint
```

# Hotfix approach
## Hotfix steps

1. Check out current hotfix branch
	* CANS: 1.0.0-hotfix
2. Fix the issue locally and create PR to сorresponding hotfix branch
3. **Important!!!** Create PR to master branch with the same fix if relevant to current functionality
3. When hotfix approved and merged into hotfix branch use one of hotfix Jenkins jobs to build new hotfix artifacts. Hotfix jobs disabled by default. Work with your Sr.Dev/Team Lead to coordinate the hotfix. In order to select correct hotfix version please use hotfix branch name plus a sequential number at the end (for example 1.0.0-hotfix1, 1.0.0-hotfix2). Use https://github.com/ca-cwds/cws-cares/blob/master/prod.yaml to identify the current version of the application in PROD.
	* CANS: [http://jenkins.dev.cwds.io:8080/view/CANS/job/cans-hotfix-build/](http://jenkins.dev.cwds.io:8080/view/CANS/job/cans-hotfix-build/)
4. When Docker image with hotfix is built and published to Docker Hub create PR for deployment to PreProd https://github.com/ca-cwds/cws-cares/blob/master/preprod.yml
5. When hotfix is tested in PreProd, create PR into https://github.com/ca-cwds/cws-cares/blob/master/prod.yaml for deployment to Prod 
 
## After the new release
1. New hotfix branches should be created for new release versions
2. Hotfix branches should be protected in GitHub similar to master
3. Hotfix pipelines in CANS should be changed to use new hotfix branches as a baseline

# Questions

If you have any questions regarding the contents of this repository, please email the Office of Systems Integration at FOSS@osi.ca.gov.
