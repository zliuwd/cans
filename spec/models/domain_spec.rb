# frozen_string_literal: true

require 'rails_helper'

describe Domain do
  it 'exists with a title' do
    domain = Domain.new(title: 'Personal Questions')
    domain.save
    expect(domain.reload.title).to eq 'Personal Questions'
  end

  it 'has questions' do
    domain = Domain.new(title: 'Personal Questions')
    domain.save
    item = Item.create(question: 'Who are you?', domain_id: domain.id)
    expect(domain.reload.items).to eq [item]
  end
end
