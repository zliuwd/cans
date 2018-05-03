# frozen_string_literal: true

require 'acceptance_helper'
require 'feature'

feature 'Assessment Page' do
  scenario 'has default rails welcome' do
    visit '/'
    expect(page).to have_content('Hello')
  end
end
