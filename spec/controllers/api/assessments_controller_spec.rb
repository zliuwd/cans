# frozen_string_literal: true

require 'rails_helper'

module Api
  describe AssessmentsController do
    let(:assessments_repository) { instance_double('Assessments::AssessmentsRepository') }

    before do
      request.session[:token] = 'token'
      allow(Assessments::AssessmentsRepository).to receive(:new)
        .with('token')
        .and_return(assessments_repository)
    end

    describe '#show' do
      let(:assessment) { { id: 11 } }
      let(:assessment_response) do
        instance_double('Faraday::Response', body: assessment, status: 200)
      end

      it 'returns a successful assessment response' do
        allow(assessments_repository).to receive(:show).with('11').and_return(assessment_response)
        get :show, params: { id: 11 }
        expect(response.body).to eq assessment.to_json
        expect(response.status).to eq 200
      end
    end

    describe '#search' do
      let(:assessments) { [{ 'id': 1 }] }
      let(:search_params) { ActionController::Parameters.new('person_id': '2') }
      let(:assessment_params) {  { 'assessment': { 'person_id': '2' } } }
      let(:assessments_response) do
        instance_double('Faraday::Response', body: assessments, status: 200)
      end

      it 'returns a successful assessments response' do
        allow(assessments_repository).to receive(:search)
          .with(search_params)
          .and_return(assessments_response)
        post :search, params: assessment_params
        expect(response.body).to eq assessments.to_json
        expect(response.status).to eq 200
      end
    end

    describe '#create' do
      let(:new_assessment) { { 'id': 22 } }
      let(:new_assessment_params) { { 'assessment': { 'assessment_type': 'INITIAL' } } }
      let(:create_params) { ActionController::Parameters.new('assessment_type': 'INITIAL') }
      let(:assessments_response) do
        instance_double('Faraday::Response', body: new_assessment, status: 200)
      end

      it 'returns a successful response with a new record' do
        allow(assessments_repository).to receive(:create)
          .with(create_params)
          .and_return(assessments_response)
        post :create, params: new_assessment_params
        expect(response.body).to eq new_assessment.to_json
        expect(response.status).to eq 200
      end
    end

    describe '#update' do
      let(:assessment) { { 'id': 22 } }
      let(:assessment_params) { { 'assessment': { 'assessment_type': 'INITIAL' } } }
      let(:updated_params) { ActionController::Parameters.new('assessment_type': 'INITIAL') }
      let(:assessments_response) do
        instance_double('Faraday::Response', body: assessment, status: 200)
      end

      it 'returns a successful response with an updated record' do
        allow(assessments_repository).to receive(:update)
          .with('22', updated_params)
          .and_return(assessments_response)
        put :update, params: { id: 22 }.merge(assessment_params)
        expect(response.status).to eq 200
        expect(response.body).to eq assessment.to_json
      end
    end

    describe '#changes' do
      let(:assessmentHistory) { { id: 11 } }
      let(:assessment_response) do
        instance_double('Faraday::Response', body: assessmentHistory, status: 200)
      end

      it 'returns a successful assessment history response' do
        allow(assessments_repository).to receive(:changes)
          .with('11')
          .and_return(assessment_response)
        get :changes, params: { id: 11 }
        expect(response.body).to eq assessmentHistory.to_json
        expect(response.status).to eq 200
      end
    end

    describe '#delete' do
      let(:assessment) { { id: 11 } }
      let(:assessment_response) do
        instance_double('Faraday::Response', body: assessment, status: 200)
      end

      it 'returns a successful response with a deleted record' do
        allow(assessments_repository).to receive(:delete)
          .with('11')
          .and_return(assessment_response)
        delete :delete, params: { id: 11 }
        expect(response.body).to eq assessment.to_json
        expect(response.status).to eq 200
      end
    end
  end
end
