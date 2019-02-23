# frozen_string_literal: true

require 'acceptance_helper'

class ClientSearch < SitePrism::Page
  element :top_alert, 'div', text: 'To Start a CANS Assessment, '\
                                            'Search and Select the Child'
  element :close_top_alert, 'button[aria-label="Close"]'
  element :search_input, 'input#downshift-0-input'
  element :search_client_link, 'div.full-name', text: 'Case, Child 01 Test'
end
