class CommentsController < ApplicationController
  
  def new
    @blog = Blog.find(params[:blog_id])
    @comment = Comment.new
  end

  def index
    @comments = Comment.all
  end

  def create
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.comments.create(comment_params)
    flash[:notice] ="Comment posted...!"
    redirect_to blogs_path(@blog_id)
  end

  def edit
  end

  def show
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.comments.create(comment_params)
  end

  def update
    @comment.update(comment_params)
    redirect_to comment_path(@comment.id)
    flash[:notice] ="Edited Successfully"
  end

    def destroy
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.comments.find(params[:id])
    @comment.destroy
    redirect_to blogs_path(@blog_id)
  end

  def approve
    @blog = Blog.find(params[:blog_id])
    @comment = @blog.comments.find(params[:id])
    @comment.update_attribute(:approve, 'true')
    redirect_to blogs_path
  end

private

  def comment_params
    params.require(:comment).permit(:id, :message, :name, :email, :site, :approve)
  end
  
  def get_comment
    @comment = Comment.find(params["id"])
  end
end
