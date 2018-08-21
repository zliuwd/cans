# frozen_string_literal: true

require 'rails_helper'

describe LogoutController do
  it 'has a route' do
    expect(get: 'user/logout').to route_to(
      controller: 'logout',
      action: 'index'
    )
  end

  it 'invalidates session and redirects to perry with clearing accessCode param' do
    request.session[:token] = 'token'
    headers = { HTTP_REFERER: 'http://host.name/123?accessCode=code' }
    request.headers.merge! headers
    get :index
    expect(request.session[:token]).to eq nil
    expect(response.status).to eq 301
    expect(response.location).to eq 'https://perry.test:8080/authn/logout?callback=http://host.name/123'
  end
end
