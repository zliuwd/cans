# frozen_string_literal: true

module Api
  class AssessmentsController < ActionController::API
    def show
      response = Assessments::AssessmentsRepository.new(session[:token]).show(params[:id])
      render json: response.body, status: response.status
    end

    def search
      response = Assessments::AssessmentsRepository.new(session[:token]).search(params[:assessment])
      render json: response.body, status: response.status
    end

    def create
      response = Assessments::AssessmentsRepository.new(session[:token]).create(params[:assessment])
      render json: response.body, status: response.status
    end

    def update
      assessment_repository = Assessments::AssessmentsRepository.new(session[:token])
      response = assessment_repository.update(params[:id], params[:assessment])
      render json: response.body, status: response.status
    end

    def changes
      response = Assessments::AssessmentsRepository.new(session[:token]).changes(params[:id])
      render json: response.body, status: response.status
    end

    def delete
      response = Assessments::AssessmentsRepository.new(session[:token]).delete(params[:id],
                                                                                params[:reason])
      render json: response.body, status: response.status
    end
  end
end
