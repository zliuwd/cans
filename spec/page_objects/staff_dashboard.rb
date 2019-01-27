# frozen_string_literal: true

class StaffDashboard < SitePrism::Page
  element :staff_card_title, 'div.card-title-fix', match: :first
  element :client_list_card_title, 'div.card-title-fix', text: CLIENT_LIST_TITLE
  elements :client_list_links, 'div.rt-td a'
  def visit_client_profile(client_name)
    target_client_link = client_list_links.find { |link| link.text == client_name }
    target_client_link.click
  end

  def client_link(client_name)
    client_list_links.find { |link| link.text == client_name }
  end
end
