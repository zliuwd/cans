# frozen_string_literal: true

module Counties
  class CountiesRepository
    def initialize(token = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @http_service = http_service
    end

    def index
      @http_service.call('/counties', :get, @token)
    end
  end
end
