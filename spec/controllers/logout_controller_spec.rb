# frozen_string_literal: true

require 'rails_helper'

describe LogoutController do
  it 'has a route' do
    expect(get: 'user/logout').to route_to(
      controller: 'logout',
      action: 'index'
    )
  end

  before do
    allow(ENV).to receive(:fetch).with('CANS_BASE_PATH', '').and_return('/cans_base')
  end

  it 'invalidates session and redirects to perry' do
    request.session[:token] = 'token'
    get :index
    expect(request.session[:token]).to eq nil
    expect(response.status).to eq 301
    expect(response.location).to start_with 'https://perry.test:8080/authn/logout'
  end

  it 'sets the callback_url to the base path to avoid leaking state to the next user' do
    request.session[:token] = 'token'
    headers = { HTTP_REFERER: 'http://host.name/123' }
    request.headers.merge! headers
    get :index
    expect(response.location).to eq 'https://perry.test:8080/authn/logout?callback=http://host.name/cans_base'
  end

  it 'clears the access_code param' do
    request.session[:token] = 'token'
    headers = { HTTP_REFERER: 'http://host.name/123?accessCode=code' }
    request.headers.merge! headers
    get :index
    expect(response.location).not_to include 'code'
  end
end
