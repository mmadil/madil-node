
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');  
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/users', user.list);

// Routes -----------------------------------
app.get("/", function (req, res) {
	res.render("index", {title: "madil.in - blog, hacks and more..."});
});

app.get("/blog/?", function (req, res){
	res.render("blog",{title: "madil.in - blog"});
});

app.get("/gsoc/?", function (req, res){
	res.render("gsoc",{title: "Google Summer of Code"});
});

app.get("/defend-internet-freedom/?", function(req, res){
	res.render("defend-internet-freedom", {title: "Internet Defence League"});
});

// -------------------------------------------

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
