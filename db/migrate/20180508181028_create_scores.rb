# frozen_string_literal: true

class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.integer :value
      t.integer :assessment_id
      t.integer :item_id
      t.boolean :confidential

      t.timestamps
    end

    add_foreign_key :scores, :assessments
    add_foreign_key :scores, :items
  end
end
