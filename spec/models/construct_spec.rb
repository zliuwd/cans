# frozen_string_literal: true

require 'rails_helper'

describe Construct do
  it 'exists with a name' do
    construct = Construct.new(name: 'Template 1')
    construct.save
    expect(construct.reload.name).to eq 'Template 1'
  end

  it 'has many domains' do
    construct = Construct.new(name: 'Template 1')
    construct.save
    domain1 = Domain.new(title: 'Domain 1', construct_id: construct.id)
    domain2 = Domain.new(title: 'Domain 2', construct_id: construct.id)
    domain1.save
    domain2.save
    expect(construct.reload.domains).to eq [domain1, domain2]
  end
end
