# frozen_string_literal: true

class AccountController < ActionController::Base
  def index
    token = session[:token]
    account = User::AccountService.new.get_perry_account(token)
    render json: account
  end
end
