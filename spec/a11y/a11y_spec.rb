# frozen_string_literal: true

require 'acceptance_helper'

feature 'Pages are accessible' do
  client_identifier = 'ATBLX8600c'

  before(:all) do
    login
  end

  after(:all) do
    logout
  end

  scenario 'Child/Youth List page is accessible' do
    visit '/'
    expect(page).to have_content 'CANS'
  end

  scenario 'Child Information page is accessible' do
    visit "/clients/#{client_identifier}"
    expect(page).to have_content 'Child Information'
    expect(page).to be_accessible
  end

  scenario 'Assessment Form page is accessible' do
    visit "/clients/#{client_identifier}/assessments"
    expect(page).to have_content 'New CANS'
    # DatePicker's calendar popup has a lazy rendering so we have to open and close it
    # to comply with accessibility rules
    click_button 'Select date'
    click_button 'Select date'
    # Select age group to see the domains
    click_button 'Age: 6-21'
    # Expanding one domain and one item in it to assert their accessibility
    find('#domain0-expand').click
    find('#PSYCHOSIS-item-expand').click
    expect(page).to be_accessible
  end
end
