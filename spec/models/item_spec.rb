# frozen_string_literal: true

require 'rails_helper'

describe Item do
  it 'exists with a question' do
    item = Item.new(question: 'Who are you?')
    item.save
    expect(item.reload.question).to eq 'Who are you?'
  end
end
