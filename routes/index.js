// home page
exports.index = function(req, res){
  res.render('index', { title: 'welcome to box_land' });
};

// everything else page, ie 404
exports.none = function(req, res){
  res.render('index', { title: '404!'});
};