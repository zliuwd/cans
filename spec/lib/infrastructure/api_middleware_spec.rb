# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe ApiMiddleware do
    describe '#call' do
      let(:application) { instance_double('ActionDispatch::Routing::RouteSet') }
      let(:api_middleware) { ApiMiddleware.new(application) }

      context 'when token is present' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com/api/test', {}) }

        it 'forward request to api' do
          request = Rack::Request.new(environment)
          request.session['token'] = 'token'
          expected_response = [200, {}, {}]
          allow(application).to receive(:call).with(environment).and_return(expected_response)
          actual_response = api_middleware.call(environment)
          expect(actual_response).to eq expected_response
        end
      end

      context 'when token is not present' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com/api/test', {}) }

        it 'return 401' do
          expected_response = [401, {}, []]
          actual_response = api_middleware.call(environment)
          expect(actual_response).to eq expected_response
        end
      end

      context 'frontend call is in progress' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com/page/test', {}) }

        it 'middleware is ignored' do
          expected_response = [200, {}, {}]
          allow(application).to receive(:call).with(environment).and_return(expected_response)
          actual_response = api_middleware.call(environment)
          expect(actual_response).to eq expected_response
        end
      end
    end
  end
end
