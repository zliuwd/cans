# frozen_string_literal: true

require 'spec_helper'

module Clients
  describe ClientsRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:clients_repository) { ClientsRepository.new(token, http_service) }
    let(:response) { Faraday::Response.new }

    describe '#show' do
      it 'returns a client' do
        allow(http_service).to receive(:call)
          .with('/clients/12', :get, token)
          .and_return(response)
        expect(clients_repository.show(12)).to eq(response)
      end
    end

    describe '#show_comparison' do
      it 'returns assessments comparison data' do
        allow(http_service).to receive(:call)
          .with('/clients/16/assessment_comparison?isUnderSix=true', :get, token)
          .and_return(response)
        expect(clients_repository.show_comparison(16, true)).to eq(response)
      end
    end

    describe '#show_init_assessment' do
      it 'returns initialezed assessment' do
        allow(http_service).to receive(:call)
          .with('/clients/123/assessments/_initialize', :get, token)
          .and_return(response)
        expect(clients_repository.show_init_assessment(123)).to eq(response)
      end
    end
  end
end
