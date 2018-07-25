# frozen_string_literal: true

require 'rails_helper'

module Api
  describe PeopleController do
    let(:people_repository) { instance_double('People::PeopleRepository') }

    before do
      request.session[:token] = 'token'
      allow(People::PeopleRepository).to receive(:new)
        .with('token').and_return(people_repository)
    end

    describe '#show' do
      let(:person) { { id: 42, first_name: 'Jorge' } }
      let(:person_response) do
        instance_double('Faraday::Response', body: person, status: 200)
      end

      it 'returns a person' do
        allow(people_repository).to receive(:show).with('42').and_return(person_response)
        get :show, params: { id: 42 }
        expect(response.body).to eq person.to_json
      end
    end

    describe '#create' do
      let(:person) { { id: '2' } }
      let(:new_person_params) { { 'person': { 'person_role': 'CLIENT' } } }
      let(:create_person_params) { ActionController::Parameters.new('person_role': 'CLIENT') }
      let(:person_response) do
        instance_double('Faraday::Response', body: person, status: 200)
      end

      it 'saves a person' do
        allow(people_repository).to receive(:create)
          .with(create_person_params)
          .and_return(person_response)
        post :create, params: new_person_params
        expect(response.status).to eq 200
        expect(response.body).to eq person.to_json
      end
    end

    describe '#update' do
      let(:person) { { id: '2' } }
      let(:new_person_params) { { 'person': { 'person_role': 'CLIENT' } } }
      let(:update_person_params) { ActionController::Parameters.new('person_role': 'CLIENT') }
      let(:person_response) do
        instance_double('Faraday::Response', body: person, status: 200)
      end

      it 'saves a person' do
        allow(people_repository).to receive(:update)
          .with('2', update_person_params)
          .and_return(person_response)
        put :update, params: { id: 2 }.merge(new_person_params)
        expect(response.status).to eq 200
        expect(response.body).to eq person.to_json
      end
    end

    describe '#search' do
      let(:people) { [{ 'id': 1, 'person_role': 'CLIENT', 'first_name': 'Bruce' }] }
      let(:people_params) { { 'person': { 'person_role': 'CLIENT' } } }
      let(:search_params) { ActionController::Parameters.new('person_role': 'CLIENT') }
      let(:people_response) do
        instance_double('Faraday::Response', body: people, status: 200)
      end

      it 'returns successful person response' do
        allow(people_repository).to receive(:search).with(search_params).and_return(people_response)
        post :search, params: people_params
        expect(response.body).to eq people.to_json
        expect(response.status).to eq 200
      end
    end
  end
end
