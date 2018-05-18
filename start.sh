#!/usr/bin/env bash

cd client/ && yarn build && yarn deploy && cd .. && bundle install && bundle exec rails s
