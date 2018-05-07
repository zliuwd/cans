class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :question
      t.integer :domain_id
      t.timestamps
    end

    add_foreign_key :items, :domains
  end
end
