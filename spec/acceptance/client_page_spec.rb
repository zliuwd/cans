# frozen_string_literal: true

require 'acceptance_helper'

feature 'Client Pages' do
  scenario 'can add a new client' do
    login
    client = post_new_client
    expect(page).to have_content 'Child/Youth Profile'
    expect(page).to have_content client['first_name']
    expect(page).to have_content client['last_name']
    expect(page).to have_content client['case_number_0']
    expect(page).to have_content client['case_number_1']
    expect(page).to have_content client['client_id']
    expect(page).to have_content client['county']
  end

  private

  def select_fresno_county
    find('#county-select').find(:xpath, 'option[11]').select_option
  end

  def select_ventura_county
    find('#county-select').find(:xpath, 'option[57]').select_option
  end
end
