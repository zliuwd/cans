# frozen_string_literal: true

require 'rails_helper'

module Api
  describe CountiesController do
    let(:counties_repository) { instance_double('Counties::CountiesRepository') }

    describe '#index' do
      let(:counties) { [{ id: 1, name: 'Orange' }] }
      let(:counties_response) do
        instance_double('Faraday::Response', body: counties, status: 200)
      end

      it 'returns response with counties' do
        request.session[:token] = 'token'
        allow(Counties::CountiesRepository).to receive(:new)
          .with('token')
          .and_return(counties_repository)
        allow(counties_repository).to receive(:index).with(no_args).and_return(counties_response)
        get :index
        expect(response.status).to eq 200
        expect(response.body).to eq counties.to_json
      end
    end
  end
end
