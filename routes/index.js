
/*
 * GET home page.
 */

exports.index = function(req, res){
	var steam_return = null;
	console.log ('session.passport = ' + req.session.passport);
	console.log('session.passport.user = ' + req.session.passport.user)
	if (req.session.passport != undefined && req.session.passport.user != undefined){
		steam_return = req.session.passport.user.identifier
		console.log('user signed in as:'+ steam_return);
	}
  res.render('index', { title: 'Wheel Of Co-Op', steam_id:steam_return });
  console.log(req.session);
};

var count_session = 0;

exports.new_session = function(req, res){
  //res.send(object) will return json also. Should return a session object later on.
  // In the meantime...
  res.json ({session_id: count_session++});
};