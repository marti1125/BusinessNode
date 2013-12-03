
/**
 * Module dependencies.
 */

var express = require('express');
var nodemailer = require('nodemailer');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var company = require('./routes/company');
var solutions = require('./routes/solutions');
var services = require('./routes/services');
var contacts = require('./routes/contacts');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/company', company.company);
app.get('/solutions', solutions.solutions);
app.get('/services', services.services);
app.get('/contacts', contacts.contacts);
app.use(function(req,res){
    res.render('404');
});

app.post('/send', function (req, res) {
	var mailOpts, smtpConfig;
	smtpConfig = nodemailer.createTransport('SMTP', {
		service: 'Gmail',
		auth: {
			user: "yourGmailidGoesHere @gmail.com",
			pass: "yourpasswordgoeshere"
		}
	});
	//construct the email sending module
	mailOpts = {
		from: req.body.name + ' &lt;' + req.body.email + '&gt;',
		to: 'urgmailid@gmail.com',
		//replace it with id you want to send multiple must be separated by , (Comma)
		subject: 'contact form',
		text: req.body.message
	};
	//send Email
	smtpConfig.sendMail(mailOpts, function (error, response) {
		//Email not sent
		if (error) {
			res.end("Email send Falied");
		}
		//email send sucessfully
		else {
		res.end("Email send sucessfully");
		}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
