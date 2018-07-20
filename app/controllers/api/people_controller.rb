# frozen_string_literal: true

module Api
  class PeopleController < ActionController::API
    def show
      response = People::PeopleRepository.new(session[:token]).show(params[:id])
      render json: response.body, status: response.status
    end

    def search
      response = People::PeopleRepository.new(session[:token]).search(params[:person])
      render json: response.body, status: response.status
    end

    def create
      people_repository = People::PeopleRepository.new(session[:token])
      response = people_repository.create(params[:person])
      render json: response.body, status: response.status
    end
  end
end
