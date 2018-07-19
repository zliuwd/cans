# frozen_string_literal: true

# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

app = Rack::Builder.new do
  map ENV['CANS_BASE_PATH'] || '/' do
    run Cans::Application
  end
end

run app
