class BlogsController < ApplicationController
	before_action :find_blog,:only=>[:edit,:update,:show,:destroy]
 	before_action :require_user, :only=> [:edit,:destroy,:new]

	def index
		@blogs = Blog.all.includes(:comments)
		@blogs = Blog.paginate(:page => params[:page], :per_page => 6)
	end

	def create
		@blog = Blog.new(assign_params)
		@blog.save
		flash[:notice] ="Blog Posted..!"
		redirect_to blog_path(@blog.id)
	end

	def new
		@blog = Blog.new
	end

	def edit
		@blog = Blog.find(params[:id])
	end

	def update
		@blog.update(assign_params)
		redirect_to blogs_path
		flash[:notice] ="Blog Edited Successfully"
	end

	def show
		@comment = Comment.new
		@comments = @blog.comments
	end


	def destroy
		@blog.destroy
		flash[:notice] ="Blog Deleted Successfully"
		redirect_to blogs_path
	end

private

	def assign_params
		params.require(:blog).permit(:title,:body,:author,:user_id, :blog_image)
	end

	def find_blog
		@blog = Blog.find(params["id"])
	end

end
