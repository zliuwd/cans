# frozen_string_literal: true

require 'rails_helper'

describe Assessment do
  it 'belongs to  a construct' do
    construct = Construct.new(name: 'Construct 1')
    construct.save
    assessment = Assessment.new(assessed_by: 'George Burdell', construct: construct)
    assessment.save
    expect(assessment.reload.construct_id).to eq construct.id
  end
end
