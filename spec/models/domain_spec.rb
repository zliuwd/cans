# frozen_string_literal: true

require 'rails_helper'

describe Domain do
  it 'exists with a title' do
    domain = Domain.new(title: 'Personal Questions')
    domain.save
    expect(domain.reload.title).to eq 'Personal Questions'
  end
end
