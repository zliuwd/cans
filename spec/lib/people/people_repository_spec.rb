# frozen_string_literal: true

require 'spec_helper'

module People
  describe PeopleRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:person_repository) { PeopleRepository.new(token, http_service) }
    let(:response) { Faraday::Response.new }

    describe '#show' do
      it 'returns a person' do
        allow(http_service).to receive(:call)
          .with('/people/12', :get, token)
          .and_return(response)
        expect(person_repository.show(12)).to eq(response)
      end
    end

    describe '#create' do
      it 'creates a person' do
        allow(http_service).to receive(:call)
          .with('/people', :post, token, person_role: 'CLIENT', first_name: 'George')
          .and_return(response)
        expect(person_repository.create(person_role: 'CLIENT', first_name: 'George')).to eq response
      end
    end

    describe '#search' do
      it 'returns people' do
        allow(http_service).to receive(:call)
          .with('/people/_search', :post, token, person_role: 'CLIENT')
          .and_return(response)
        expect(person_repository.search(person_role: 'CLIENT')).to eq(response)
      end
    end
  end
end
