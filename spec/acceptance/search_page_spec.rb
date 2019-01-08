# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Search Page' do
  scenario 'Non case worker lands on client search and able to search' do
    login non_caseworker_json
    expect(page).to have_content('Search Clients Only')
    fill_in 'downshift-0-input', with: 'Lackie'
    expect(page).to have_content('10/21/2001')
    logout
  end
end
