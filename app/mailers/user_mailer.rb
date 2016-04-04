class UserMailer < ApplicationMailer
	ADMIN_EMAILS = ['suyog.taksande@gmail.com']

	def contact_us(contact_us_record)
		@contact_us = contact_us_record
		mail(:to => ADMIN_EMAILS, :subject => 'Website visitor wants to contact you.')
	end
end
