// home page
exports.index = function(req, res){
  res.render('index', { title: 'welcome to box_land' });
};

// boxy page
exports.boxy = function(req, res){
  res.render('boxy', { title: 'boxy' });
};

// flappy_box page
exports.flappy_box = function(req, res){
  res.render('flappy_box', {title: 'flappy_box'});
};

// dodge_box page
exports.dodge_box = function(req, res) {
  res.render('dodge_box', {title: 'dodge_box'});
};

// everything else page, ie 404
exports.none = function(req, res){
  res.render('index', { title: '404!'});
};
