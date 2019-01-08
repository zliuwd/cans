# frozen_string_literal: true

module CreateInProcessFormHelper
  def visit_client_profile(client_name)
    find('a', text: /\A#{client_name}\z/).click
  end

  def create_assessment_form
    find('#add-new-cans').click
    expect(page).to have_content 'CANS Communimetric Assessment Form'
  end
end
