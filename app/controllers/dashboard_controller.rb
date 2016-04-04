class DashboardController < ApplicationController
	
	def aboutus	
	end
	
	def homepage
		@portfolios = Portfolio.all.order("created_at DESC")
	end
end
