# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Index Page' do
  scenario 'has cans homepage' do
    login
    expect(page).to have_content('CANS')
  end

  scenario 'page is accessible' do
    pending('page has accessability issues')
    login
    expect(page).to have_content 'CANS'
    expect(page).to be_accessible
  end
end
