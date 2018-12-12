# frozen_string_literal: true

require 'acceptance_helper'

feature 'Assessment Page' do
  scenario 'can fill and complete assessment' do
    login
    visit '/clients/0PcpFQu0QM'
    expect(page).to have_content('NEW CANS', wait: 30)
    post_new_assessment
    expect(page).to have_content 'Complete'
  end
end
