# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Index Page' do
  scenario 'has cans homepage' do
    visit '/'
    expect(page).to have_content('CANS')
  end
end
