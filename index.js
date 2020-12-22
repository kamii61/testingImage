var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	
	bodyParser=require("body-parser");
	const pool= require("./db");


 
// all environments
app.set('port', process.env.PORT || 10000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);
//Middleware
app.listen(10000)