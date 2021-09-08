module.exports.sendMail = (toMail) => {
	const sgMail = require('@sendgrid/mail')
	sgMail.setApiKey(process.env.SENDGRID_API_KEY)
	const msg = {
	  to: toMail, // Change to your recipient
	  from: 'vuthanhxuan0201@gmail.com', // Change to your verified sender
	  subject: 'Welcome to iService',
	  text: 'Create an iService account successfully',
	  html: '<strong>SIT313</strong>',
	}
	sgMail.send(msg)
	  .then(() => {
		console.log('Email sent')
	  })
	  .catch((error) => {
		console.error(error)
	  })
	
	};
	// Run these commands before npm start
	// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
	// echo "sendgrid.env" >> .gitignore
	// source ./sendgrid.env;
	// npm install --save @sendgrid/mail
	// npm start
	