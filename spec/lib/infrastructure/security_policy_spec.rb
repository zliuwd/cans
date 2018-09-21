# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe SecurityPolicy do
    describe '#validate_access' do
      let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
      let(:security_policy) { SecurityPolicy.new(security_gateway) }

      context 'with valid access code' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=good_code', {})
        end
        let(:request) { Rack::Request.new(environment) }
        let(:privileges) { ['CANS-rollout'] }
        let(:account_json) do
          { 'privileges': privileges }.to_json
        end

        it 'stores a valid token in session' do
          request = Rack::Request.new(environment)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('good_code').and_return('some_token')
          allow(security_gateway).to receive(:validate_token)
            .with('some_token').and_return(account_json)
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'some_token'
        end
      end

      context 'with invalid access code' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=with_bad_accessCode', {})
        end

        it 'returns false' do
          request = Rack::Request.new(environment)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('with_bad_accessCode').and_return(nil)
          expect(security_policy.validate_access(request)).to eq nil
        end
      end

      context 'with existing valid session token' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com', {})
        end

        it 'returns validated token from session' do
          request = Rack::Request.new(environment)
          request.session['token'] = 'good_token'
          allow(security_gateway).to receive(:validate_token)
            .with('good_token').and_return('good_token')
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'good_token'
        end
      end

      context 'with existing invalid session token' do
        let(:environment) do
          Rack::MockRequest.env_for('http://example.com?accessCode=good_accessCode', {})
        end

        let(:request) { Rack::Request.new(environment) }
        let(:privileges) { ['CANS-rollout'] }
        let(:account_json) do
          { 'privileges': privileges }.to_json
        end

        before do
          request.session['token'] = 'invalid_token'
          allow(security_gateway).to receive(:validate_token)
            .with('invalid_token').and_return(nil)
          allow(security_gateway).to receive(:fetch_new_token)
            .with('good_accessCode').and_return('new_token')
          allow(security_gateway).to receive(:validate_token)
            .with('new_token').and_return(account_json)
        end

        it 'saves new token to session' do
          security_policy.validate_access(request)
          expect(request.session['token']).to eq 'new_token'
        end

        it 'saves privileges' do
          security_policy.validate_access(request)
          expect(request.session['privileges']).to eq(['CANS-rollout'])
        end
      end
    end
  end
end
