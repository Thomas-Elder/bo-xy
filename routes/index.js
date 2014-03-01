
/*
 * GET home page.
 */

// home page
exports.index = function(req, res){
  res.render('index', { title: 'Hello' });
};

// boxy page
exports.boxy = function(req, res){
  res.render('boxy', { title: 'boxy' });
};

exports.none = function(req, res){
  res.render('index', { title: '404!'});
};