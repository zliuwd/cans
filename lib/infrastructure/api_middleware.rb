# frozen_string_literal: true

module Infrastructure
  class ApiMiddleware
    def initialize(application)
      @application = application
    end

    def call(environment)
      request = Rack::Request.new(environment)
      return do_call(environment) if matches?(request)

      @application.call(environment)
    end

    private

    def do_call(environment)
      request = Rack::Request.new(environment)
      session_token = request.session['token']
      return @application.call(environment) if session_token

      [401, {}, []]
    end

    def matches?(request)
      request.fullpath.include?('/api/')
    end
  end
end
