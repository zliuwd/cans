# frozen_string_literal: true

module SensitivityTypes
  class SensitivityTypesRepository
    def initialize(token = nil, params = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @params = params
      @http_service = http_service
    end

    def index
      @http_service.call('/sensitivity-types', :get, @token, @params)
    end
  end
end
