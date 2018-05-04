# frozen_string_literal: true

require 'rails_helper'

describe Template do
  it 'exists with a name' do
    template = Template.new(name: 'Template 1')
    template.save
    expect(template.reload.name).to eq 'Template 1'
  end

  it 'has many domains' do
    template = Template.new(name: 'Template 1')
    template.save
    domain1 = Domain.new(title: 'Domain 1', template_id: template.id)
    domain2 = Domain.new(title: 'Domain 2', template_id: template.id)
    domain1.save
    domain2.save
    expect(template.reload.domains).to eq [domain1, domain2]
  end
end
