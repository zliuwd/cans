# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/staff_dashboard'
require 'page_objects/supervisor_dashboard'
require 'page_objects/client_profile'

feature 'Supervisor functionality' do
  before(:all) do
    @supervisor_dash = SupervisorDashboard.new
    @staff_dash = StaffDashboard.new
    @client_profile = ClientProfile.new
  end

  scenario 'Supervisor lands on staff list, visits one of staff member clients and logs out' do
    login supervisor_json
    expect(@supervisor_dash).to have_supervisor_card_title
    @supervisor_dash.visit_staff_member_dashboard(STAFF_NAME)
    @staff_dash.staff_card_title.text eq(STAFF_NAME)
    expect(@staff_dash).to have_client_list_card_title
    @staff_dash.client_link(CLIENT_NAME).text eq(CLIENT_NAME)
    @staff_dash.visit_client_profile(CLIENT_NAME)
    expect(@client_profile).to have_client_information_title
    @client_profile.last_name.text eq(CLIENT_LAST_NAME)
    expect(@client_profile).to have_assessment_history_title
    logout
  end
end
