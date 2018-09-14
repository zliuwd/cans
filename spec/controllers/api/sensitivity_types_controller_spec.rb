# frozen_string_literal: true

require 'rails_helper'

module Api
  describe SensitivityTypesController do
    let(:sensitivity_types_repository) do
      instance_double('SensitivityTypes::SensitivityTypesRepository')
    end

    describe '#index' do
      let(:sensitivity_types) { %w[SENSITIVE SEALED] }
      let(:repository_response) do
        instance_double('Faraday::Response', body: sensitivity_types, status: 200)
      end
      let(:params) { { 'county': '42' } }

      it 'returns response with sensitivity types' do
        request.session[:token] = 'token'
        allow(SensitivityTypes::SensitivityTypesRepository).to receive(:new)
          .with('token', params)
          .and_return(sensitivity_types_repository)
        allow(sensitivity_types_repository).to receive(:index)
          .with(no_args)
          .and_return(repository_response)
        get :index, params: params
        expect(response.status).to eq 200
        expect(response.body).to eq sensitivity_types.to_json
      end
    end
  end
end
