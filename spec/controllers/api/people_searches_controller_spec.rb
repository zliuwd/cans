# frozen_string_literal: true

require 'rails_helper'

module Api
  describe PeopleSearchesController do
    before(:each) do
      allow(Dora::PersonSearchRepository).to \
        receive(:search).and_return({})
    end

    describe '.index' do
      it 'returns status 200' do
        get :index, params: {}
        expect(response).to be_successful
      end
    end

    describe '.search_params' do
      it 'returns params object with search_term' do
        params = ActionController::Parameters.new(search_term: 'annie')
        allow_any_instance_of(described_class).to receive(:params).and_return(params)

        result = described_class.new.send(:search_params).to_h
        expect(result).to include(
          search_term: 'annie',
          person: {
            date_of_birth: { gte: 'now-22y' }
          }
        )
      end

      it 'returns person with age range between 0 and 22 years' do
        params = ActionController::Parameters.new(
          search_term: 'george',
          person: { date_of_birth: 'now-100y' }
        )
        allow_any_instance_of(described_class).to receive(:params).and_return(params)

        result = described_class.new.send(:search_params).to_h
        expect(result).to include(
          search_term: 'george',
          person: {
            date_of_birth: { gte: 'now-22y' }
          }
        )
      end
    end
  end
end
