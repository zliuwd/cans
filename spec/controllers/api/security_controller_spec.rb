# frozen_string_literal: true

require 'rails_helper'

module Api
  describe SecurityController do
    let(:security_service) { instance_double('Security::SecurityService') }

    before do
      request.session[:token] = 'token'
      allow(Security::SecurityService).to receive(:new)
        .with('token')
        .and_return(security_service)
    end

    describe '#check_permission' do
      let(:permission_response) do
        instance_double('Faraday::Response', body: 'true', status: 200)
      end
      let(:permission) { 'assessment:write:1' }

      it 'returns permisson check result' do
        allow(security_service).to receive(:check_permission)
          .with(permission)
          .and_return(permission_response)
        get :check_permission, params: { permission: permission }
        expect(response.body).to eq 'true'
        expect(response.status).to eq 200
      end
    end

    describe '#refresh' do
      it 'returns empty response with status: 200' do
        get :refresh
        expect(response.body).to eq ''
        expect(response.status).to eq 200
      end
    end
  end
end
