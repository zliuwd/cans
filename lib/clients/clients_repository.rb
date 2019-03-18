# frozen_string_literal: true

module Clients
  class ClientsRepository
    def initialize(token = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @http_service = http_service
    end

    def show(id)
      @http_service.call("/clients/#{id}", :get, @token)
    end

    def show_comparison(id, is_under_six)
      @http_service
        .call("/clients/#{id}/assessment_comparison?isUnderSix=#{is_under_six}", :get, @token)
    end

    def show_init_assessment(id)
      @http_service.call("/clients/#{id}/assessments/_initialize", :get, @token)
    end
  end
end
