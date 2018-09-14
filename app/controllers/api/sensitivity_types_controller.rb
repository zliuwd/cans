# frozen_string_literal: true

module Api
  class SensitivityTypesController < ActionController::API
    def index
      response = SensitivityTypes::SensitivityTypesRepository.new(
        session[:token],
        'county': params[:county]
      ).index
      render json: response.body, status: response.status
    end
  end
end
