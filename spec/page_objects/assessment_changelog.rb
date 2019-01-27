# frozen_string_literal: true

class AssessmentChangeLog < SitePrism::Page
  elements :titles, 'div.change-log-title span'

  def is_client_name?(client_name)
    client = titles.find { |span| span.text == 'CANS Change Log: ' + client_name }
    client ? true : false
  end

  def is_assessment?(assessment_date)
    assessment_date_title = titles.find do |title|
      title.text == 'Assessment Date: ' + assessment_date
    end
    assessment_date_title ? true : false
  end
end
