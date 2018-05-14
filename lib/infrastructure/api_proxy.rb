# frozen_string_literal: true

require 'rack/proxy'

module Infrastructure
  class ApiProxy < Rack::Proxy
    def perform_request(env)
      request = Rack::Request.new(env)
      if request.path.match?(%r{^\/api})
        env['HTTP_HOST'] = api_host
        env['REQUEST_PATH'].sub!(%r{^\/api}, '')
        query = env['QUERY_STRING']
        env['QUERY_STRING'] = query.concat("#{query ? '&' : ''}token=#{request.session['token']}")
        super(env)
      else
        @app.call(env)
      end
    end

    private

    def api_host
      cans_api_base_url = Rails.configuration.micro_services['cans_api_base_url']
      uri = Addressable::URI.parse(cans_api_base_url)
      "#{uri.hostname}:#{uri.port}"
    end
  end
end