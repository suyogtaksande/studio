class PortfoliosController < ApplicationController
  before_action :require_user, :only => [:show, :edit, :update]
  
  def new
    @portfolio = Portfolio.new
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)
    if @portfolio.save
      flash[:notice] = "Portfolio saved successfully...!"
      redirect_to portfolios_path
    else
      flash[:notice] = "There was a problem saving portfolio."
      
    end
  end

  def index
    @portfolios = Portfolio.all
  end

  def edit
    @portfolio = Portfolio.find(params[:id])
  end

  def update
    @portfolio = Portfolio.find(params[:id])
    @portfolio.update(portfolio_params)
    redirect_to portfolios_path
    flash[:notice] ="Portfolio Edited Successfully"
  end

  def show
    @portfolio = Portfolio.find(params[:id])
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    @portfolio.destroy
    flash[:notice] ="Portfolio Deleted Successfully"
    redirect_to portfolios_path
  end

private

  def portfolio_params
    params.require(:portfolio).permit(:title , :description , :url , :portfolio_image)
  end

end
