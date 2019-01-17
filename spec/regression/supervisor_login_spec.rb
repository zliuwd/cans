# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/client_list'

# retrive the last name from client full name string
CLIENT_LAST_NAME = CLIENT_NAME.split(',').first

feature 'Supervisor functionality' do
  scenario 'Supervisor lands on staff list, visits one of staff member clients and logs out' do
    @client_list = ClientList.new
    login supervisor_json
    expect(page).to have_content('CANS')
    expect(page).to have_content('Assigned Staff', wait: 10)
    visit_staff_member_dashboard(STAFF_NAME)
    expect(page).to have_content(STAFF_NAME)
    expect(page).to have_content('Client List', wait: 10)
    expect(page).to have_content(CLIENT_NAME)
    @client_list.visit_client_profile(CLIENT_NAME)
    expect(page).to have_content('Client Information')
    expect(page).to have_content(CLIENT_LAST_NAME)
    expect(page).to have_content('Assessment History')
    logout
  end
end
