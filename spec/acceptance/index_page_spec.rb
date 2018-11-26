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
    expect(page).to have_content('Assigned Staff')
    logout
  end

  scenario 'Logging out clears your last visited page' do
    login supervisor_json
    expect(page).to have_content('Assigned Staff')
    click_logout
    expect(page).not_to have_content('CANS')
  end
end
