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
      request.session['token'] = new_token if new_token
    end

    def valid?(request)
      access_code = request.params['accessCode']
      token = request.session['token']
      token = fetch_new_token(access_code) if access_code
      if token.blank?
        false
      elsif token_is_valid?(token)
        true
      else
        false
      end
    end

    private

    def token_is_valid?(token)
      @security_gateway.validate_token(token)
    end

    def fetch_new_token(access_code)
      @security_gateway.fetch_new_token(access_code)
    end
  end
end
