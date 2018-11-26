# frozen_string_literal: true

require 'acceptance_helper'

feature 'Assessment Page' do
  scenario 'can fill and complete assessment' do
    login
    click_link 'County Client List'
    visit '/clients/0gvpG1o0QM'
    post_new_assessment
    expect(page).to have_content 'Complete'
  end
end
