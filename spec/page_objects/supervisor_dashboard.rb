# frozen_string_literal: true

class SupervisorDashboard < SitePrism::Page
  element :supervisor_card_title, 'div.card-title-fix', text: 'Assigned Staff'
  elements :staff_list_links, 'div.rt-td a'
  def visit_staff_member_dashboard(staff_member_name)
    target_client_link = staff_list_links.find { |link| link.text == staff_member_name }
    target_client_link.click
  end
end
