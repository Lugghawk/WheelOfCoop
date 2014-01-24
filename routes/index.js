
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Wheel Of Co-Op' });
};

var count_session = 0;

exports.new_session = function(req, res){
  //res.send(object) will return json also. Should return a session object later on.
  // In the meantime...
  res.json ({session_id: count_session++});
};