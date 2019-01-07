# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Index Page' do
  scenario 'Case worker login, creates assessment and logs out' do
    login
    expect(page).to have_content('CANS')
    expect(page).to have_content('Client List')
    caseworker_client_identifier
    expect(page).to have_content('ADD CANS', wait: 60)
    verify_radio_buttons_on_assessment_header
    fetch_challenges_domain
    click_button 'Save'
    caseworker_client_identifier # doing it twice since sometimes it fails on the first attempt
    caseworker_client_identifier
    expect(page).to have_content('In Progress', wait: 60)
    logout
  end
end
