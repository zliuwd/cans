# frozen_string_literal: true

module Api
  class InstrumentsController < ActionController::API
    def show
      response = Instruments::InstrumentsRepository.new(session[:token]).show(params[:id])
      render json: response.body, status: response.status
    end

    def translations_by_instrument_id
      repository = Instruments::InstrumentsRepository.new(session[:token])
      response = repository.translations_by_instrument_id(params[:id], params[:language])
      render json: response.body, status: response.status
    end
  end
end
