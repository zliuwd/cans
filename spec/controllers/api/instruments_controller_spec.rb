# frozen_string_literal: true

require 'rails_helper'

module Api
  describe InstrumentsController do
    let(:instruments_repository) { instance_double('Instruments::InstrumentsRepository') }

    before do
      allow(Instruments::InstrumentsRepository).to receive(:new)
        .with('token').and_return(instruments_repository)
      request.session[:token] = 'token'
    end

    describe '#show' do
      let(:instrument) { { id: 11, prototype: {} } }
      let(:instrument_response) do
        instance_double('Faraday::Response', body: instrument, status: 200)
      end

      it 'returns a succesful instrument response' do
        allow(instruments_repository).to receive(:show).with('11').and_return(instrument_response)
        get :show, params: { id: 11 }
        expect(response.body).to eq instrument.to_json
        expect(response.status).to eq 200
      end
    end

    describe '#translations_by_instrument_id' do
      let(:translations) { { 'ADJUSTMENT_TO_TRAUMA._description_': 'tramua' } }
      let(:instrument_response) do
        instance_double('Faraday::Response', body: translations, status: 200)
      end

      it 'returns a successful list of translations' do
        allow(instruments_repository).to receive(:translations_by_instrument_id)
          .with('22', 'en')
          .and_return(instrument_response)
        get :translations_by_instrument_id, params: { id: 22, language: 'en' }
        expect(response.status).to eq 200
        expect(response.body).to eq translations.to_json
      end
    end
  end
end
