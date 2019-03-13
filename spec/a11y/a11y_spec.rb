# frozen_string_literal: true

require 'acceptance_helper'
require 'helpers/assessment_helper'

feature 'Pages are accessible' do
  assessment_helper = AssessmentHelper.new
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
    visit '/'
    assessment_helper.start_assessment_for CLIENT_NAME
    click_button 'Age: 6-21'
    # Expanding one domain and one item in it to assert their accessibility
    find('#domain0-expand').click
    find('#PSYCHOSIS-item-expand').click

    # this exclude should be discussed with designers
    expect(page).to be_accessible.excluding '#cancel-assessment', '#assessment-date_input'
  end
end
