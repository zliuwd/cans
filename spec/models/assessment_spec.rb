# frozen_string_literal: true

require 'rails_helper'

describe Assessment do
  it 'has an assessed_by' do
    assessment = Assessment.new(assessed_by: 'George Burdell')
    assessment.save
    expect(assessment.reload.assessed_by).to eq 'George Burdell'
  end

  it 'has a construct' do
    assessment = Assessment.new(assessed_by: 'George Burdell')
    assessment.save
    construct = Construct.new(name: 'Construct 1', assessment_id: assessment.id)
    construct.save
    expect(assessment.reload.construct).to eq construct
  end
end
