# frozen_string_literal: true

module Security
  class SecurityService
    def initialize(token = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @http_service = http_service
    end

    def check_permission(permission)
      @http_service.call("/security/check_permission/#{permission}", :get, @token)
    end
  end
end
