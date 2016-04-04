class Comment < ActiveRecord::Base
	belongs_to :blog
	scope :visible, -> { where(approve: true) }
end
