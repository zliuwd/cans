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

## Running with Preint environment

In order to run against Preint environment: 
1. Create a `.env` file and copy its body from the [CWDS env-store repo's cans.dev.local-with-preint.env](https://github.com/ca-cwds/env-store/blob/master/envs/cans/cans.dev.local-with-preint.env) (the repo is private, for CWDS developers usage only).
2. Run local instance of Redis (`docker-compose up redis` or `redis-server` if you have it installed)
3. Run CANS application: 
    1. Run Rails (`rails s`), and the webpack dev server (`yarn start` or `./bin/webpack-dev-server`).
    2. **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CANS root folder. Please do not include the foreman gem in the Gemfile

## Running everything locally with Docker Compose

You will need a full **.env** file for this.
Copy it from the [CWDS env-store repo's cans.dev.local.env](https://github.com/ca-cwds/env-store/blob/master/envs/cans/cans.dev.local.env) (the repo is private, for CWDS developers usage only).

Once you have your **.env** file next to the **docker-compose.yml** file, start up your dependency applications by running:

```docker-compose up```

Then run Rails (`rails s`) and the webpack development server (`yarn start` or `./bin/webpack-dev-server`). **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CANS root folder. Please do not include the foreman gem in the Gemfile.

## Linting and Tests

To run the React test suite with watcher:

```yarn test```

and a one-time run with coverage

```yarn test:coverage```

Other commands:

```
yarn test:rspec # runs Rspec unit tests
yarn test:regression # runs regression tests, requires app to be running
yarn test:a11y # runs accessibility tests, requires app to be running
yarn lint
```

To run local tests with a real browser instead of headless mode execute rspec directly like:
```
yarn test:regression:local
yarn test:a11y:local
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
