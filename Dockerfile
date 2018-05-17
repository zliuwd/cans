FROM ruby:2.5.1
ENV ENVIRONMENT_REFRESH 2017-10-11
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update -qq && apt-get install -y build-essential libpq-dev yarn && \
    rm -rf /var/lib/apt/lists/*
RUN mkdir /app
WORKDIR /app
ADD Gemfile Gemfile.lock /app/
RUN bundle install --jobs 20 --retry 5
ADD package.json /app/client
ADD . /app
RUN mkdir /client
RUN cd /app/client && yarn install && yarn build && yarn deploy
# RUN NODE_ENV=production RAILS_ENV=production bundle exec rails assets:precompile
# Required because we have mapping issues in nginx
# RUN ln -s /app/public/casemng/packs /app/public/packs
EXPOSE 3000 3035
RUN cd /app
CMD ["bundle", "exec", "rails", "server"]
