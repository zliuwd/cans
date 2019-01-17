# frozen_string_literal: true

class ClientList < SitePrism::Page
  elements :client_list_links, 'div.rt-td a'
  def visit_client_profile(client_name)
    target_client_link = client_list_links.find { |link| link.text == client_name }
    target_client_link.click
  end
end
