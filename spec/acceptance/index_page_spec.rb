# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Index Page' do
  scenario 'CANS-Worker lands on client list and can logout' do
    login
    expect(page).to have_content('CANS')
    expect(page).to have_content('Client List')
    logout
  end

  scenario 'Supervisor lands on staff list and can logout' do
    login supervisor_json
    expect(page).to have_content('CANS')
    expect(page).to have_content('Assigned Staff', wait: 100)
    logout
  end

  scenario 'Logging out clears your last visited page' do
    login supervisor_json
    expect(page).to have_content('Assigned Staff', wait: 100)
    click_logout
    expect(page).not_to have_content('CANS')
    enter_credentials
    expect(page).not_to have_content('Assigned Staff', wait: 100)
    logout
  end

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
