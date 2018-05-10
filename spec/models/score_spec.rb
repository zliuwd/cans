# frozen_string_literal: true

require 'rails_helper'

describe Score do
  it 'has a value' do
    score = Score.new(value: 3)
    score.save
    expect(score.reload.value).to eq 3
  end
end
