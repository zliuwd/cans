# frozen_string_literal: true

require 'infrastructure/security_policy'
require 'infrastructure/query_param_remover'

module Infrastructure
  class CwdsAuthenticator
    def initialize(application)
      @application = application
    end

    def call(environment)
      return @application.call(environment) unless Feature.active?(:authentication)
      request = Rack::Request.new(environment)
      security_policy = Infrastructure::SecurityPolicy.new
      return redirect_to_login(request.url) unless security_policy.validate_access(request)
      @application.call(environment)
    end

    private

    def redirect_to_login(url)
      callback = QueryParamRemover.new.remove_query_param(url, 'token')
      [301, { 'Location' => login_url(callback) }, []]
    end

    def login_url(callback)
      perry_base_url = Rails.configuration.micro_services['perry_base_url']
      "#{perry_base_url}/authn/login?callback=#{callback}"
    end
  end
end
