# frozen_string_literal: true

require 'rails_helper'
require 'feature/testing'

module Infrastructure
  describe TimeoutMiddleware do
    describe '#call' do
      let(:timeout) { 1.hour }
      let(:application) { instance_double('ActionDispatch::Routing::RouteSet') }
      let(:timeout_middleware) { TimeoutMiddleware.new(application) }
      let(:environment) { Rack::MockRequest.env_for('http://example.com/api/test', {}) }
      def parse_set_cookie_header(header)
        kv_pairs = header.split(/\s*;\s*/).map do |attr|
          key, value = attr.split '='
          [key, value || nil]
        end
        Hash[kv_pairs]
      end

      it 'generates timeout cookies' do
        Rails.application.config.session_options[:expire_after] = timeout
        response = [200, {}, {}]
        allow(application).to receive(:call).with(environment).and_return(response)
        min_expiration_time = (Time.now + timeout).to_i * 1000
        actual_response = timeout_middleware.call(environment)
        max_expiration_time = (Time.now + timeout).to_i * 1000
        cookie_header = actual_response[1]['Set-Cookie']
        cookie = parse_set_cookie_header(cookie_header)
        expect(cookie.key?('_ca_cans_timeout')).to be_truthy
        expiration_time = cookie['_ca_cans_timeout'].to_i
        expect(expiration_time).to be >= min_expiration_time
        expect(expiration_time).to be <= max_expiration_time
      end
    end
  end
end
