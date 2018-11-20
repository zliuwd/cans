# frozen_string_literal: true

require_relative './api_exception_processor'

module Infrastructure
  class HttpService
    def initialize(base_url = Rails.configuration.micro_services['cans_api_base_url'])
      @base_url = base_url
    end

    def call(url, method, token, payload = nil)
      http_connection.send(method) do |request|
        request.url url
        request.headers['Authorization'] = token
        set_payload(request, method, payload)
      end
    end

    private

    def http_connection
      Faraday.new(url: @base_url) do |connection|
        connection.use Infrastructure::ApiExceptionProcessor
        connection.adapter Faraday.default_adapter
      end
    end

    def set_payload(request, method, payload)
      return request if payload.nil?

      if method == :get
        request.params = payload
      else
        request.headers['Content-Type'] = 'application/json'
        request.body = payload.to_json
      end
      request
    end
  end
end
