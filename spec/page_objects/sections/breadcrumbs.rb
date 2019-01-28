# frozen_string_literal: true

class Breadcrumbs < SitePrism::Section
  elements :breadcrumb_links, 'span.breadcrumbs a'
  def route_from_breadcrumbs(breadcrumb_link_text)
    target = breadcrumb_links.find { |link| link.text == breadcrumb_link_text }
    target.click
  end
end
