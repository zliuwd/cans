class RenameTemplateIdToConstructIdForDomains < ActiveRecord::Migration[5.2]
  def change
    rename_column :domains, :template_id, :construct_id
  end
end
