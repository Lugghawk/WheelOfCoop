
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var SteamStrategy = require('passport-steam').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
Steam OpenID
*/
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/auth/steam/return',
    realm: 'http://localhost:3000/'
  },
  function(identifier, profile, done) {
    console.log('id = ' + identifier);

    process.nextTick(function (){
    	profile.identifier = identifier;
    	return done(null,profile);
    });
    
  }
));

app.get('/', routes.index);
app.get('/rest/session/new', routes.new_session);
app.get('/users', user.list);
app.get('/auth/steam',
	passport.authenticate('steam', { failureRedirect: '/'}),
	function (req,res){
		res.redirect('/');
	});
app.get('/auth/steam/return',
	passport.authenticate('steam', { successRedirect: '/', failureRedirect: '/'}));



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
