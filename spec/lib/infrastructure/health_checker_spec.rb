# frozen_string_literal: true

require 'spec_helper'
require 'redis'
require 'json'

module Infrastructure
  describe HealthChecker do
    describe '#check' do
      let(:redis) { instance_double('Redis') }
      let(:http_service) { instance_double('Infrastructure::HttpService') }
      let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
      let(:cans_api_response) { instance_double('Faraday::Response') }
      let(:perry_response) { instance_double('Faraday::Response') }
      let(:health_checker) { HealthChecker.new(redis, http_service, security_gateway) }

      before do
        allow(redis).to receive(:ping).with(no_args)
        allow(http_service).to receive(:call)
          .with('/system-information', :get, nil)
          .and_return(cans_api_response)
        allow(security_gateway).to receive(:health_check)
          .with(no_args)
          .and_return(perry_response)
        allow(cans_api_response).to receive(:status).and_return(200)
        allow(perry_response).to receive(:status).and_return(200)
      end

      context 'when all services are up' do
        it 'shows as healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq true
        end

        it 'returns redis success' do
          expect(JSON.parse(health_checker.check)['health_checks']['redis']['healthy']).to eq true
        end

        it 'returns cans api success' do
          expect(JSON.parse(health_checker.check)['health_checks']['cansapi']['healthy']).to eq true
        end

        it 'returns perry success' do
          expect(JSON.parse(health_checker.check)['health_checks']['perry']['healthy']).to eq true
        end
      end

      context 'when redis is down' do
        before do
          allow(redis).to receive(:ping).with(no_args).and_throw(Redis::CannotConnectError.new)
        end

        it 'shows as not healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq false
        end

        it 'returns redis failure' do
          expect(JSON.parse(health_checker.check)['health_checks']['redis']['healthy']).to eq false
        end

        it 'returns error message' do
          message = JSON.parse(health_checker.check)['health_checks']['redis']['message']
          expect(message).to match('Redis::CannotConnectError')
        end
      end

      context 'when cans api is down' do
        before do
          allow(cans_api_response).to receive(:status).and_return(500)
        end

        it 'shows as not healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq false
        end

        it 'returns a cans-api failure' do
          response = JSON.parse(health_checker.check)
          expect(response['health_checks']['cansapi']['healthy']).to eq false
        end

        it 'sets an error message' do
          message = JSON.parse(health_checker.check)['health_checks']['cansapi']['message']
          expect(message).to match('cansapi returned 500')
        end
      end

      context 'when cans api raises an error' do
        before do
          allow(http_service).to receive(:call)
            .with('/system-information', :get, nil)
            .and_raise(StandardError.new('error'))
        end

        it 'shows as not healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq false
        end

        it 'returns a cans-api failure' do
          response = JSON.parse(health_checker.check)
          expect(response['health_checks']['cansapi']['healthy']).to eq false
        end

        it 'sets an error message' do
          message = JSON.parse(health_checker.check)['health_checks']['cansapi']['message']
          expect(message).to match('cansapi returned error')
        end
      end

      context 'when perry is down' do
        before do
          allow(perry_response).to receive(:status).and_return(500)
        end

        it 'shows as not healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq false
        end

        it 'returns a perry failure' do
          expect(JSON.parse(health_checker.check)['health_checks']['perry']['healthy']).to eq false
        end

        it 'sets an error message' do
          message = JSON.parse(health_checker.check)['health_checks']['perry']['message']
          expect(message).to match('perry returned 500')
        end
      end

      context 'when perry raises an error' do
        before do
          allow(security_gateway).to receive(:health_check)
            .with(no_args)
            .and_raise(StandardError.new('error'))
        end

        it 'shows as not healthy' do
          expect(JSON.parse(health_checker.check)['health_status']).to eq false
        end

        it 'returns a perry failure' do
          expect(JSON.parse(health_checker.check)['health_checks']['perry']['healthy']).to eq false
        end

        it 'sets an error message' do
          message = JSON.parse(health_checker.check)['health_checks']['perry']['message']
          expect(message).to match('perry returned error')
        end
      end
    end
  end
end
