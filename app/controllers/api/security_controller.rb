# frozen_string_literal: true

module Api
  class SecurityController < ActionController::API
    def check_permission
      response = Security::SecurityService
                 .new(session[:token])
                 .check_permission(params[:permission])
      render plain: response.body, status: response.status
    end

    def refresh
      render plain: nil, status: 200
    end
  end
end
