# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Index Page' do
  scenario 'CANS pages have active feature information' do
    login
    active_features = page.evaluate_script(
      'JSON.stringify(window.org.cans.active_features)'
    )
    expect(active_features).to start_with('[')
    expect(active_features).to end_with(']')
    logout
  end
end
