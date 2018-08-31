# frozen_string_literal: true

require 'spec_helper'
require_relative '../../../lib/infrastructure/api_exception_processor'

module Infrastructure
  describe 'ApiExceptionProcessor' do
    let(:app) { instance_double('Cans::Application') }
    let(:env) { instance_double('Rack::Request') }
    let(:middleware) { ApiExceptionProcessor.new(app) }

    describe '#call' do
      context 'when response status < 400' do
        it 'does nothing' do
          response = Faraday::Response.new(status: 200)
          allow(app).to receive(:call).with(env).and_return(response)
          expect(middleware.call(env)).to eq(response)
        end
      end

      context 'when response status >= 400' do
        context 'when content is json' do
          it 'should have the same response' do
            error_body = '{issue_details: [{message: \'Error Message\'}]}'
            response = Faraday::Response.new(status: 422, body: error_body.to_json)
            allow(app).to receive(:call).with(env).and_return(response)
            response = middleware.call(env)
            expect(response.body).to eq(error_body)
            expect(response.status).to eq(422)
          end
        end

        context 'when content is json' do
          it 'should wrap content to json' do
            messge = 'Error Message'
            expected_json = '{issue_details: [{message: "' + messge + '"}]}'
            response = Faraday::Response.new(status: 500, body: messge)
            allow(app).to receive(:call).with(env).and_return(response)
            response = middleware.call(env)
            expect(response.body).to eq(expected_json)
            expect(response.status).to eq(500)
          end
        end
      end
    end
  end
end
