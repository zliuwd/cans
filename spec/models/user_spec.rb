# frozen_string_literal: true

require 'rails_helper'

describe User do
  it 'exists with first and last name' do
    user = User.new(first_name: 'George', last_name: 'Burdell')
    user.save
    expect(user.reload.first_name).to eq 'George'
    expect(user.reload.last_name).to eq 'Burdell'
  end
end
