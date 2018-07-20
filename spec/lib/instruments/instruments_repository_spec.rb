# frozen_string_literal: true

require 'spec_helper'

module Instruments
  describe InstrumentsRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:instruments_repository) { InstrumentsRepository.new(token, http_service) }
    let(:response) { Faraday::Response.new }

    describe '#show' do
      it 'returns an instrument' do
        allow(http_service).to receive(:call)
          .with('/instruments/22', :get, token)
          .and_return(response)
        expect(instruments_repository.show(22)).to eq response
      end
    end

    describe '#translations_by_instrument_id' do
      it 'returns i18n strings' do
        allow(http_service).to receive(:call)
          .with('/instruments/33/i18n/en', :get, token)
          .and_return(response)
        expect(instruments_repository.translations_by_instrument_id(33)).to eq response
      end
    end
  end
end
