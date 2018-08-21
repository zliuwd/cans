# frozen_string_literal: true

class LogoutController < ActionController::Base
  def index
    reset_session
    redirect_to logout_url, status: 301
  end

  private

  def logout_url
    referer_url = request.referer || request.base_url
    param_remover = Infrastructure::QueryParamRemover.new
    callback_url = param_remover.remove_query_param(referer_url, 'accessCode')
    perry_base_url = Rails.configuration.micro_services['perry_base_url']
    "#{perry_base_url}/authn/logout?callback=#{callback_url}"
  end
end
