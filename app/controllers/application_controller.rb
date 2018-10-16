# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :set_no_cache
  def fallback_index_html
    @data = { foo: 'bar' }
  end

  def set_no_cache
    response.headers['Cache-Control'] = 'no-cache, no-store, max-age=0, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
  end
end
