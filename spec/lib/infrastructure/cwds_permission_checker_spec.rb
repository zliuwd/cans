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
        it 'redirects when user has no roles and privileges' do
          allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans')
          status, headers = cwds_permission_checker.call(environment)
          expect(status).to eq 301
          expect(headers['Location']).to eq '/cans/error_page'
        end
      end

      context 'when there is a valid session' do
        it 'user is able to access the application with valid roles and privileges' do
          request = Rack::Request.new(environment)
          request.session['roles'] = ['CANS-worker']
          request.session['privileges'] = ['CANS-rollout']
          allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
          status, _headers = cwds_permission_checker.call(environment)
          expect(status).to eq 200
        end
      end

      context 'when there is invalid session' do
        it 'redirects when user has no privileges' do
          allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans')
          request = Rack::Request.new(environment)
          request.session['roles'] = ['CANS-worker']
          status, headers, = cwds_permission_checker.call(environment)
          expect(status).to eq 301
          expect(headers['Location']).to eq '/cans/error_page'
        end
      end

      context 'when there is invalid session' do
        it 'redirects when user has no roles' do
          allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans')
          request = Rack::Request.new(environment)
          request.session['privileges'] = ['CANS-rollout']
          status, headers, = cwds_permission_checker.call(environment)
          expect(status).to eq 301
          expect(headers['Location']).to eq '/cans/error_page'
        end
      end
    end
  end
end
