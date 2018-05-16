# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def fallback_index_html
    render :file => 'app/views/index.html'
  end
end
