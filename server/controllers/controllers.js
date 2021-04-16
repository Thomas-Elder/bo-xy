var highscoreManager;
var lobbyManager;

var Controller = function(lm, hm){
  lobbyManager = lm;
  highscoreManager = hm;
};

Controller.prototype.index = function(req, res){
  
  res.render('index', { title: 'B O X L A N D' });
};

Controller.prototype.blog = function(req, res){
  
  res.render('blog', { title: 'B L O G L A N D' });
};

Controller.prototype.single = function(req, res){

  res.render('single', { title: 'B O X' });
};

Controller.prototype.mingle = function(req, res){

  res.render('mingle', { title: 'B O X E S', lobbies: lobbyManager.getAll()});
};

Controller.prototype.highscores = function(req, res){

  res.render('highscores', 
      { 
        title: 'H I G H S C O R E S',
        scores: highscoreManager.getAll()
      }
  );
};

Controller.prototype.none = function(req, res){
  
  res.render('notFound', { title: 'N O T H I N G'});
};

module.exports = Controller;