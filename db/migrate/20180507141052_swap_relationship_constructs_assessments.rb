# frozen_string_literal: true

class SwapRelationshipConstructsAssessments < ActiveRecord::Migration[5.2]
  def change
    remove_foreign_key :constructs, :assessments
    remove_column :constructs, :assessment_id
    add_column :assessments, :construct_id, :integer
    add_foreign_key :assessments, :constructs
  end
end
