# frozen_string_literal: true

require 'axe/rspec'
require 'capybara'
require 'capybara/rspec'
require 'selenium/webdriver'
require 'acceptance_helpers/resource_helper'
require 'acceptance_helpers/login_helper'

Capybara.register_driver :selenium do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.javascript_driver = :chrome_headless

Capybara.configure do |config|
  include LoginHelper
  include ResourceHelper
  config.default_max_wait_time = 10
  config.default_driver = :selenium
  config.app_host = ENV.fetch('CANS_WEB_BASE_URL', 'http://localhost:3000')
end
