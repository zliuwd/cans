# frozen_string_literal: true

require 'rails_helper'

module Api
  describe ClientsController do
    let(:clients_repository) { instance_double('Clients::ClientsRepository') }

    before do
      request.session[:token] = 'token'
      allow(Clients::ClientsRepository).to receive(:new)
        .with('token').and_return(clients_repository)
    end

    describe '#show' do
      let(:client) { { id: 42, first_name: 'Jorge' } }
      let(:client_response) do
        instance_double('Faraday::Response', body: client, status: 200)
      end

      it 'returns a client' do
        allow(clients_repository).to receive(:show).with('42').and_return(client_response)
        get :show, params: { id: 42 }
        expect(response.body).to eq client.to_json
      end
    end

    describe '#show_comparison' do
      let(:comparison) { { event_dates: ['someDates'], domains: ['someDomains'] } }
      let(:comparison_response) do
        instance_double('Faraday::Response', body: comparison, status: 200)
      end

      it 'returns a set of assessment comparison data' do
        allow(clients_repository)
          .to receive(:show_comparison)
          .with('100')
          .and_return(comparison_response)
        get :show_comparison, params: { id: 100 }
        expect(response.body).to eq comparison.to_json
      end
    end
  end
end
