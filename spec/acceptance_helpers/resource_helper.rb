# frozen_string_literal: true

require 'faker'
require 'active_support/time'

module ResourceHelper
  def post_new_client
    visit '/clients/new'
    expect(page).to have_content 'Add Child/Youth'
    client = fake_client
    fill_and_save_client_info client
    client['id'] = current_url.split('/').last
    client
  end

  private

  def fake_client
    {
      'first_name' => Faker::Name.first_name,
      'last_name' => Faker::Name.last_name,
      'dob' => Faker::Date.between(20.years.ago, 10.years.ago).strftime('%m/%d/%Y'),
      'client_id' => fake_client_id,
      'case_number_0' => fake_case_number,
      'case_number_1' => fake_case_number,
      'county' => 'Ventura'
    }
  end

  def fake_client_id
    "#{Faker::Number.number(4)}-#{Faker::Number.number(4)}-"\
      "#{Faker::Number.number(4)}-#{Faker::Number.number(7)}"
  end

  def fake_case_number
    "#{Faker::Number.number(4)}-#{Faker::Number.number(3)}-"\
      "#{Faker::Number.number(4)}-#{Faker::Number.number(8)}"
  end

  def focus_and_fill_in(selector, text)
    element = find(selector)
    element.click
    element.set(text)
  end

  def fill_and_save_client_info(client)
    fill_client_info client
    click_button 'Save'
    expect(page).to have_content 'Child/Youth Profile'
  end

  # rubocop:disable Metrics/AbcSize
  def fill_client_info(client)
    fill_in('First Name', with: client['first_name'])
    fill_in('Last Name', with: client['last_name'])
    focus_and_fill_in('#dob', client['dob'])
    find('.case-numbers-single-control').click
    focus_and_fill_in('#caseNumber0', client['case_number_0'])
    focus_and_fill_in('#caseNumber1', client['case_number_1'])
    focus_and_fill_in('#external_id', client['client_id'])
    find('#county-select').find(:xpath, 'option[57]').select_option
  end
  # rubocop:enable Metrics/AbcSize
end
