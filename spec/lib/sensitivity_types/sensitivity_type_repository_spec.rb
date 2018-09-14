# frozen_string_literal: true

require 'spec_helper'

module SensitivityTypes
  describe SensitivityTypesRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:payload) { { "county": '42' } }
    let(:sensitivity_types_repository) do
      SensitivityTypesRepository.new(token, payload, http_service)
    end
    let(:response) { Faraday::Response.new }

    describe '#index' do
      it 'returns sensitivity types' do
        allow(http_service).to receive(:call).with(
          '/sensitivity-types',
          :get,
          token,
          payload
        ).and_return(response)
        expect(sensitivity_types_repository.index).to eq(response)
      end
    end
  end
end
