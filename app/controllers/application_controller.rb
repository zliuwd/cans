# frozen_string_literal: true

class ApplicationController < ActionController::Base

  def fallback_index_html
    @data = { foo: 'bar' }
  end

end
