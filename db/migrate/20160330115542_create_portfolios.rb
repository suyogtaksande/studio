class CreatePortfolios < ActiveRecord::Migration
  def change
    create_table :portfolios do |t|
      t.string :title
      t.string :description
      t.string :url
      t.string :image

      t.timestamps 
    end
  end
end
