# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/client_search'
require 'page_objects/client_profile'

feature 'Non Case Worker Functionality' do
  before(:all) do
    @client_search = ClientSearch.new
    @client_profile = ClientProfile.new
  end

  after(:all) do
    logout
  end

  scenario 'Non Case worker login, search client, select it and logs out' do
    login non_caseworker_json
    expect(@client_search).to have_top_alert
    @client_search.close_top_alert.click
    expect(@client_search).to have_no_top_alert
    @client_search.search_input.click
    @client_search.search_input.set SEARCH_CLIENT_NAME
    expect(@client_search).to have_search_client_link
    @client_search.search_client_link.click
    @client_profile.last_name.text eq(SEARCH_CLIENT_LAST_NAME)
    expect(@client_profile).to have_assessment_history_title
  end
end
