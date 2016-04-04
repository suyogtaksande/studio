class AddColumnToComments < ActiveRecord::Migration
  def change
  	add_column :comments, :blog_id, :integer
	add_column :comments, :approve, :boolean, :default => false
  end
end
