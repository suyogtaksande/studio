class AddImageToPortfolio < ActiveRecord::Migration
  def up
    add_attachment :portfolios, :portfolio_image
  end

  def down
    remove_attachment :portfolios, :portfolio_image
  end
end
