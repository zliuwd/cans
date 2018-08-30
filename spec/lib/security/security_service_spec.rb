# frozen_string_literal: true

require 'spec_helper'

module Security
  describe SecurityService do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:security_service) { SecurityService.new(token, http_service) }
    let(:response) { Faraday::Response.new }

    describe '#check_permission' do
      it 'returns permission check result' do
        allow(http_service).to receive(:call)
          .with('/security/check_permission/assessment:write:1', :get, token)
          .and_return(response)
        expect(security_service.check_permission('assessment:write:1')).to eq(response)
      end
    end
  end
end
