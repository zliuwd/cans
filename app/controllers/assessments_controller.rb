# frozen_string_literal: true

class AssessmentsController < ApplicationController
  def index; end

  def new
    @assessment = Assessment.new(construct: default_construct)
  end

  private

  def default_construct
    Construct.find_by(name: 'Default')
  end
end
