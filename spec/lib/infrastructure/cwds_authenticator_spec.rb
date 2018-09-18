# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

module Infrastructure
  describe CwdsAuthenticator do
    describe '#call' do
      let(:application) { instance_double('ActionDispatch::Routing::RouteSet') }
      let(:cwds_authenticator) { CwdsAuthenticator.new(application) }
      let(:security_policy) { instance_double('Infrastructure::SecurityPolicy') }

      before do
        allow(SecurityPolicy).to receive(:new).with(no_args).and_return(security_policy)
      end

      context 'when there is no session and no access code' do
        let(:environment) { Rack::MockRequest.env_for('http://example.com/', {}) }

        it 'redirects the user to perry login url' do
          Feature.run_with_activated(:authentication) do
            allow(security_policy).to receive(:validate_access)
              .with(instance_of(Rack::Request)).and_return(nil)
            status, headers = cwds_authenticator.call(environment)
            expect(status).to eq 301
            expect(headers['Location']).to eq 'https://perry.test:8080/authn/login?callback=http://example.com/'
          end
        end
      end

      context 'with feature checking' do
        context 'when authentication feature is active' do
          it 'checks valid authentication' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com/', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, _headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
            end
          end

          it 'redirects to perry with no token param' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com?token=old', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test:8080/authn/login?callback=http://example.com/'
            end
          end

          it 'redirects to perry with no token param while leaving other params' do
            Feature.run_with_activated(:authentication) do
              environment = Rack::MockRequest.env_for('http://example.com?token=old&param=two', {})
              allow(security_policy).to receive(:validate_access)
                .with(instance_of(Rack::Request)).and_return(nil)
              status, headers = cwds_authenticator.call(environment)
              expect(status).to eq 301
              expect(headers['Location']).to eq 'https://perry.test:8080/authn/login?callback=http://example.com/?param=two'
            end
          end
        end

        context 'when authentication feature is inactive' do
          let(:environment) { Rack::MockRequest.env_for('http://example.com/', {}) }
          it 'skips authentication checking' do
            Feature.run_with_deactivated(:authentication) do
              allow(application).to receive(:call).with(environment).and_return([200, {}, {}])
              status, _headers = cwds_authenticator.call(environment)
              expect(status).to eq 200
            end
          end
        end
      end
    end
  end
end
