class Portfolio < ActiveRecord::Base
	validates :title, presence: true
	validates :description, presence: true
	validates :url, presence: true
	has_attached_file :portfolio_image, styles: { medium: "220x210>", thumb: "85x80>", natural: "360x206", small: "80x80", large: "700x600" }
    validates_attachment_content_type :portfolio_image, content_type: /\Aimage\/.*\Z/
end
