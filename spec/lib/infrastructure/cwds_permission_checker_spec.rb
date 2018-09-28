# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

module Infrastructure
  describe CwdsPermissionChecker do
    describe '#call' do
      let(:application) { instance_double('ActionDispatch::Routing::RouteSet') }
      let(:cwds_permission_checker) { CwdsPermissionChecker.new(application) }
      let(:environment) do
        Rack::MockRequest.env_for('http://example.com?accessCode=good_accessCode', {})
      end

      context 'when there is no session' do
        it 'redirects when user has no privileges' do
          allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '/').and_return('/cans')
          allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans')
          status, headers = cwds_permission_checker.call(environment)
          expect(status).to eq 301
          expect(headers['Location']).to eq '/cans/error_page'
        end
      end

      context 'when there is a valid session' do
        it 'user is able to access the application with valid privileges' do
          request = Rack::Request.new(environment)
          request.session['privileges'] = ['CANS-rollout']
          allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
          status, _headers = cwds_permission_checker.call(environment)
          expect(status).to eq 200
        end
      end

      context 'when api call is in progress' do
        let(:env) { Rack::MockRequest.env_for('http://example.com/cans/api/test') }

        it 'front end permission check is disabled' do
          Feature.run_with_activated(:authentication) do
            allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans')
            expected_response = [200, {}, {}]
            allow(application).to receive(:call).with(env).and_return(expected_response)
            actual_response = cwds_permission_checker.call(env)
            expect(actual_response).to eq expected_response
          end
        end
      end
    end
  end
end
