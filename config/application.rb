require_relative 'boot'

require "active_storage/engine"
require "action_controller/railtie"
require "action_view/railtie"
require "action_mailer/railtie"
require "active_job/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"
require "sprockets/railtie"
# To enable db connection uncomment this line
# require "active_record/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Cans
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    require 'infrastructure/cwds_authenticator'
    config.middleware.use Infrastructure::CwdsAuthenticator

    require 'infrastructure/api_proxy'
    config.middleware.use Infrastructure::ApiProxy, {ssl_verify_none: true}

    config.micro_services = config_for(:micro_services)
  end
end
