class Blog < ActiveRecord::Base
	has_many :comments, dependent: :destroy
	has_attached_file :blog_image, styles: { medium: "220x210>", thumb: "85x80>", natural: "500x400", small: "80x80", large: "700x343" }
    validates_attachment_content_type :blog_image, content_type: /\Aimage\/.*\Z/
end
