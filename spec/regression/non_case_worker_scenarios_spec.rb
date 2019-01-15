# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'
require 'page_objects/client_search'

feature 'Non Case Worker Functionality' do
  before(:all) do
    @form = ClientSearch.new
  end

  after(:all) do
    logout
  end

  scenario 'Non Case worker login, search client, select it and logs out' do
    login non_caseworker_json
    expect(page).to have_content('To Start a CANS Assessment, Search and Select the Child')
    @form.close_top_alert.click
    expect(page).not_to have_content('To Start a CANS Assessment, Search and Select the Child')
    @form.search_input.click
    @form.search_input.set CLIENT_NAME
    select_client
    expect(page).to have_content 'Case, Child 01 Test, Suff'
    expect(page).to have_content 'Assessment History'
  end
end
