# frozen_string_literal: true

class ClientProfile < SitePrism::Page
  element :in_progress_record, 'span.assessment-in-progress', text: 'In Progress'
  element :add_cans_link, 'a#add-cans-link'
end

def create_assessment_form
  @client_profile.add_cans_link.click
  expect(page).to have_content 'CANS Communimetric Assessment Form'
end
