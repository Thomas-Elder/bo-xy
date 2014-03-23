
/*
 * GET home page.
 */

// home page
exports.index = function(req, res){
  res.render('index', { title: 'Welcome' });
};

// boxy page
exports.boxy = function(req, res){
  res.render('boxy', { title: 'boxy' });
};

exports.flappy_box = function(req, res){
  res.render('flappy_box', {title: 'flappy_box'});
};

exports.none = function(req, res){
  res.render('index', { title: '404!'});
};