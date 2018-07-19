# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe HttpService do
    describe '#call' do
      let(:http_service) { HttpService.new }
      let(:connection) { instance_double('Faraday::Connection') }
      let(:request) { Faraday::Request.new(:get, '/', {}, {}) }

      before do
        allow(Faraday).to receive(:new)
          .with(url: 'https://cans-api.test:8080')
          .and_return(connection)
      end

      context 'for all requests' do
        it 'sets the token in the Authorization Header' do
          allow(connection).to receive(:get).and_yield(request)
          allow(request).to receive(:url).with('/resources')
          http_service.call('/resources', :get, 'security_token', nil)
          expect(request.headers).to eq('Authorization' => 'security_token')
        end

        it 'sets the url' do
          allow(connection).to receive(:get).and_yield(request)
          expect(request).to receive(:url).with('/resources')
          http_service.call('/resources', :get, 'security_token', nil)
        end
      end

      context 'with no payload' do
        let(:request) { Faraday::Request.new(:get, '/', {}, {}) }

        it 'does not set request body or params' do
          allow(connection).to receive(:get).and_yield(request)
          allow(request).to receive(:url).with('/resources')
          http_service.call('/resources', :get, 'security_token', nil)
          expect(request.body).to be_nil
        end
      end

      context 'with a get request' do
        let(:request) { Faraday::Request.new(:get, '/', {}, {}) }

        it 'sets the request params' do
          allow(connection).to receive(:get).and_yield(request)
          allow(request).to receive(:url).with('/resources')
          expect(request).to receive(:params=).with(id: 42)
          http_service.call('/resources', :get, 'security_token', id: 42)
        end
      end

      context 'with a post request' do
        let(:request) { Faraday::Request.new(:post, '/', {}, {}) }

        it 'sets the header to application/json' do
          allow(connection).to receive(:post).and_yield(request)
          allow(request).to receive(:url).with('/resources')
          allow(request).to receive(:body=).with({ id: 42 }.to_json)
          http_service.call('/resources', :post, 'security_token', id: 42)
          expect(request.headers).to include('Content-Type' => 'application/json')
        end

        it 'sets the body to a JSON payload' do
          allow(connection).to receive(:post).and_yield(request)
          allow(request).to receive(:url).with('/resources')
          expect(request).to receive(:body=).with({ id: 42 }.to_json)
          http_service.call('/resources', :post, 'security_token', id: 42)
        end
      end
    end
  end
end
