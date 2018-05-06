# frozen_string_literal: true

class AddAssessmentIdToConstructs < ActiveRecord::Migration[5.2]
  def change
    add_column :constructs, :assessment_id, :integer
    add_foreign_key :constructs, :assessments
  end
end
