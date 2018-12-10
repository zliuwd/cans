# frozen_string_literal: true

module Api
  class PeopleSearchesController < ActionController::API
    def index
      response = Dora::PersonSearchRepository
                 .search(search_params,
                         request.uuid,
                         security_token: session[:token])
      render json: response
    end

    private

    def search_params
      demographic_search_params.permit(:search_term,
                                       :is_client_only,
                                       search_after: [],
                                       person: {})
    end

    def demographic_search_params
      hash = params.permit(:search_term, :is_client_only, search_after: []).to_h
                   .merge(person: {
                            date_of_birth: { gte: 'now-22y' }
                          })
      ActionController::Parameters.new(hash)
    end
  end
end
