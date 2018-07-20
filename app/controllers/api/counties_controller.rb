# frozen_string_literal: true

module Api
  class CountiesController < ActionController::API
    def index
      response = Counties::CountiesRepository.new(session[:token]).index
      render json: response.body, status: response.status
    end
  end
end
