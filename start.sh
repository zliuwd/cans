#!/usr/bin/env bash

cd client/ && yarn install && yarn build && yarn deploy && cd .. && bundle install && bundle exec rails server
