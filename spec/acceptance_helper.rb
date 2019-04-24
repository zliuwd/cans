# frozen_string_literal: true

require 'axe/rspec'
require 'capybara'
require 'capybara/rspec'
require 'capybara-screenshot/rspec'
require 'selenium/webdriver'
require 'site_prism'
require 'acceptance_helpers/login_helper'
require 'acceptance_helpers/prod_login_helper'

CLIENT_NAME = 'Case, Child 01 Test, Suff'
CLIENT_LAST_NAME = CLIENT_NAME.split(',').first
CLIENT_NAME_2 = 'Case, Child 02 Test, Suff'
SEARCH_CLIENT_NAME = 'Case, Child 01 Test'
SEARCH_CLIENT_LAST_NAME = SEARCH_CLIENT_NAME.split(',').first
STAFF_NAME = 'Regression, QA02'
CLIENT_LIST_TITLE = 'Client List'
CAREGIVER_DOMAIN_WARNING_MESSAGE = 'You are about to remove the caregiver from this Assessment.'

def with_retry(func0, func1, times = 3)
  loop do
    begin
      func0.call
      sleep(1)
      func1.call
      times = 0
    rescue StandardError => e
      times -= 1
      raise e if times <= 0
    end
    break if times <= 0
  end
end

def acceptance_helper
  return LoginHelper unless ENV.fetch('PROD_LOGIN', false)

  ProdLoginHelper
end

def setup_output_format
  Capybara::Screenshot::RSpec::REPORTERS['RSpec::Core::Formatters::HtmlFormatter'] =
    Capybara::Screenshot::RSpec::HtmlEmbedReporter
end

Capybara.register_driver :selenium do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.register_driver :headless_selenium do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1400,1400')

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara::Screenshot.register_driver(:headless_selenium) do |driver,path|
  driver.browser.save_screenshot path
end

Capybara.javascript_driver = :chrome_headless

Capybara.configure do |config|
  include acceptance_helper
  setup_output_format
  config.default_max_wait_time = 30
  config.default_driver = ENV.fetch('HEADLESS', 'true') == 'true' ? :headless_selenium : :selenium
  config.app_host = ENV.fetch('CANS_WEB_BASE_URL', 'http://localhost:3000')
end
