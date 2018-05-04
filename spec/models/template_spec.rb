# frozen_string_literal: true

require 'rails_helper'

describe Template do
  it 'exists with a name' do
    template = Template.new(name: 'Template 1')
    template.save
    expect(template.reload.name).to eq 'Template 1'
  end
end
