class AddImageToBlog < ActiveRecord::Migration
  def up
    add_attachment :blogs, :blog_image
  end

  def down
    remove_attachment :blogs, :blog_image
  end
end
