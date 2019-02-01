# frozen_string_literal: true

require 'spec_helper'

module Assessments
  describe AssessmentsRepository do
    let(:http_service) { instance_double('Infrastructure::HttpService') }
    let(:token) { 'security-token' }
    let(:assessments_repository) { AssessmentsRepository.new(token, http_service) }
    let(:response) { Faraday::Response.new }
    let(:reason) { 'reason' }

    describe '#show' do
      it 'returns an assessment' do
        allow(http_service).to receive(:call)
          .with('/assessments/33', :get, token)
          .and_return(response)
        expect(assessments_repository.show(33)).to eq(response)
      end
    end

    describe '#search' do
      it 'returns assessments' do
        allow(http_service).to receive(:call)
          .with('/assessments/_search', :post, token, person_id: 1)
          .and_return(response)
        expect(assessments_repository.search(person_id: 1)).to eq(response)
      end
    end

    describe '#create' do
      it 'saves assessment' do
        allow(http_service).to receive(:call)
          .with('/assessments', :post, token, assessment_type: 'INITIAL')
          .and_return(response)
        expect(assessments_repository.create(assessment_type: 'INITIAL')).to eq(response)
      end
    end

    describe '#update' do
      it 'updates assessment' do
        allow(http_service).to receive(:call)
          .with('/assessments/44', :put, token, status: 'IN_PROGRESS')
          .and_return(response)
        expect(assessments_repository.update(44, status: 'IN_PROGRESS')).to eq(response)
      end
    end

    describe '#changes' do
      it 'returns assessment history' do
        allow(http_service).to receive(:call)
          .with('/assessments/33/changelog', :get, token)
          .and_return(response)
        expect(assessments_repository.changes(33)).to eq(response)
      end
    end

    describe '#delete' do
      it 'returns an assessment' do
        allow(http_service).to receive(:execute)
          .with(url: '/assessments/33', method: :delete, token: token, params: { reason: reason })
          .and_return(response)
        expect(assessments_repository.delete(33, reason)).to eq(response)
      end
    end
  end
end
