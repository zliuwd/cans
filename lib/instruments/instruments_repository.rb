# frozen_string_literal: true

module Instruments
  class InstrumentsRepository
    def initialize(token = nil, http_service = Infrastructure::HttpService.new)
      @token = token
      @http_service = http_service
    end

    def show(id)
      @http_service.call("/instruments/#{id}", :get, @token)
    end

    def translations_by_instrument_id(id, language = 'en')
      @http_service.call("/instruments/#{id}/i18n/#{language}", :get, @token)
    end
  end
end
