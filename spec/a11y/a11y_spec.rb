# frozen_string_literal: true

require 'acceptance_helper'

feature 'Pages are accessible' do
  client_identifier = '0PcpFQu0QM'

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

  scenario 'Client Information page is accessible' do
    visit "/clients/#{client_identifier}"
    expect(page).to have_content 'Client Information'
    expect(page).to be_accessible
  end

  scenario 'Assessment Form page is accessible' do
    visit "/clients/#{client_identifier}/assessments"
    expect(page).to have_content 'CANS Communimetric Assessment Form'
    # DatePicker's calendar popup has a lazy rendering so we have to open and close it
    # to comply with accessibility rules
    click_button 'Select date'
    click_button 'Select date'
    # Select age group to see the domains
    click_button 'Age: 6-21'
    # Expanding one domain and one item in it to assert their accessibility
    find('#domain0-expand').click
    find('#PSYCHOSIS-item-expand').click

    # this exclude should be discussed with designers
    expect(page).to be_accessible.excluding '#cancel-assessment', '#assessment-date_input'
  end
end
