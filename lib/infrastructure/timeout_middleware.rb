# frozen_string_literal: true

module Infrastructure
  class TimeoutMiddleware
    def initialize(application)
      @application = application
      @timeout = CwdsStore::Store::EXPIRATION_TIME
    end

    def call(environment)
      status, headers, body = @application.call(environment)
      response = Rack::Response.new body, status, headers
      timeout = Time.now + @timeout
      response.set_cookie('_ca_cans_timeout',
                          value: (timeout.to_i * 1000).to_s,
                          path: '/',
                          httponly: false,
                          expires: timeout)
      response.finish
    end
  end
end
