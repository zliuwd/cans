# frozen_string_literal: true

require 'faraday'
require 'json'

module Infrastructure
  # custom faraday handle error exception class
  class ApiExceptionProcessor < Faraday::Middleware
    def initialize(app)
      super app
      @parser = nil
    end

    def call(env)
      @app.call(env).on_complete do |response|
        handle_response(response)
      end
    end

    private

    def handle_response(response)
      status = response[:status]
      handle_error(response) if status >= 400
    end

    def handle_error(response)
      response.body = parse_json(response.body || '')
    end

    def parse_json(json)
      JSON.parse(json)
    rescue JSON::ParserError
      JSON.parse(JSON.generate('{issue_details: [{message: "' + json + '"}]}'))
    end
  end
end
