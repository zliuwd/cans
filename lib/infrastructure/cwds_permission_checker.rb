# frozen_string_literal: true

require 'infrastructure/query_param_remover'

module Infrastructure
  class CwdsPermissionChecker
    def initialize(application)
      @application = application
    end

    def call(environment)
      request = Rack::Request.new(environment)
      return redirect_to_error_page(request.url) unless valid_roles_privileges(request)
      @application.call(environment)
    end

    private

    def valid_roles_privileges(request)
      request.session['roles']&.include?('CANS-worker') &&
        request.session['privileges'] && request.session['privileges'].include?('CANS-rollout')
    end

    def redirect_to_error_page(_url)
      [301, { 'Location' => error_page_url }, []]
    end

    def error_page_url
      "#{ENV.fetch('CANS_BASE_PATH', '')}/error_page"
    end
  end
end
