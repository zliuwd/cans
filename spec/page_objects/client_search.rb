# frozen_string_literal: true

require 'acceptance_helper'

class ClientSearch < SitePrism::Page
  element :close_top_alert, 'i.close-icon'
  element :search_input, 'input#downshift-0-input'
  element :search_client_link, 'div.full-name', text: 'Case, Child 01 Test'
end

def select_client
  expect(@form.search_client_link).to have_content('Case, Child 01 Test')
  @form.search_client_link.click
end
