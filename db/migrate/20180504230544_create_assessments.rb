# frozen_string_literal: true

class CreateAssessments < ActiveRecord::Migration[5.2]
  def change
    create_table :assessments do |t|
      t.date :assessment_date
      t.string :assessed_by
      t.timestamps
    end
  end
end
