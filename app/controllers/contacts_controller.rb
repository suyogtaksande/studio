class ContactsController < ApplicationController
  def create
  	if @contact_us = Contact.new(contact_us_params)  
      @contact_us.save
      UserMailer.contact_us(@contact_us).deliver
      render :json => {:success => true , :message => "Our Customer support will contact you soon...!"}
    end
  end

  def index
  	@contact_us = Contact.new
  end

  def new
  	@contact_us = Contact.new
  end
  private

    def contact_us_params
      params.require(:contact).permit(:name,:email,:message)
    end
end
