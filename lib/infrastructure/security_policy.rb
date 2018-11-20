# frozen_string_literal: true

require 'infrastructure/security_gateway'

module Infrastructure
  class SecurityPolicy
    def initialize(security_gateway = SecurityGateway.new)
      @security_gateway = security_gateway
    end

    def validate_access(request)
      session_token = request.session['token']
      return session_token if session_token && @security_gateway.validate_token(session_token)

      new_token = fetch_new_token(request.params['accessCode'])
      return unless new_token

      request.session['token'] = new_token
      set_privileges(request, new_token)
    end

    private

    def set_privileges(request, token)
      perry_account_response = @security_gateway.validate_token(token)
      perry_account_json = JSON.parse(perry_account_response, symbolize_names: true)
      request.session['privileges'] = perry_account_json[:privileges]
    end

    def fetch_new_token(access_code)
      @security_gateway.fetch_new_token(access_code)
    end
  end
end
