Cwds::Authentication.configure do |config|
  config.expire_after             = '4.hours'
  config.authentication_enabled   = ENV.fetch('AUTHENTICATION_ENABLED', true)
  config.perry_base_url           = Rails.configuration.micro_services['perry_base_url']
  config.cans_base_path           = Rails.configuration.micro_services['cans_api_base_url']
end
