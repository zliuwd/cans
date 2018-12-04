Cwds::Authentication.configure do |config|
  config.authentication_enabled   = ENV.fetch('AUTHENTICATION_ENABLED', true)
  config.perry_base_url           = Rails.configuration.micro_services['perry_base_url']
end
