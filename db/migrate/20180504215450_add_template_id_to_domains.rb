# frozen_string_literal: true

class AddTemplateIdToDomains < ActiveRecord::Migration[5.2]
  def change
    add_column :domains, :template_id, :integer
  end
end
