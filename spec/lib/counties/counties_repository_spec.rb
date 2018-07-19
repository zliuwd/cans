# frozen_string_literal: true

require 'spec_helper'

module Counties
  describe CountiesRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:counties_repository) { CountiesRepository.new(token, http_service) }
    let(:response) { Faraday::Response.new }

    describe '#index' do
      it 'returns counties' do
        allow(http_service).to receive(:call).with('/counties', :get, token).and_return(response)
        expect(counties_repository.index).to eq(response)
      end
    end
  end
end
