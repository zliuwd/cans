# frozen_string_literal: true

class ClientProfile < SitePrism::Page
  element :in_progress_record, 'span.assessment-in-progress', text: 'In Progress'
  element :add_cans_link, 'a#add-cans-link'
  element :ellipsis_icon, 'div.col-4 button.icon-ellipsis', match: :first
  element :assessment_change_log_date, 'div.rt-td', match: :first
  element :delete_cans_button, 'button.delete-assessment-button'
  element :cans_change_log_button, 'button.view-change-log-button'
end

def create_assessment_form
  @client_profile.add_cans_link.click
  expect(page).to have_content 'CANS Communimetric Assessment Form'
end
