# frozen_string_literal: true

class CreateDomain < ActiveRecord::Migration[5.2]
  def change
    create_table :domains do |t|
      t.string :title
    end
  end
end
