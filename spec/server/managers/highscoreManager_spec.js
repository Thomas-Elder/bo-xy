var HighscoreManager = require('../../../server/models/highscoreManager');

describe('Highscore Manager', 
  function(){
    
    var highscoreManager;

    beforeEach(
      function(done){
        highscoreManager = new HighscoreManager();
        done();
    });
    
    it('should add the given lobby to the HighscoreManager',
      function(done){
        var expected = [{name: 'Bill',
                        score: 1000 }];
        
        var test = {name: 'Bill',
                    score: 1000 };
        
        highscoreManager.add(test);

        var result = highscoreManager.getAll();
        
        expect(result).toEqual(expected);
        done();
    });
        
    it('should get all scores from the HighscoreManager',
      function(done){
        var expected = [{ name: 'Tom',
                         score: 2000},
                         { name: 'Bill',
                         score: 1000 }];
                         
        highscoreManager.add({ name: 'Bill',
                         score: 1000 });
        highscoreManager.add({ name: 'Tom',
                         score: 2000});
        
        var result = highscoreManager.getAll();
        
        expect(result).toEqual(expected);
        done();
    });  
    
    it('should maintain descending order for all scores',
      function(done){
        var expected = [{ name: 'Tom',
                         score: 2000},
                         { name: 'Bill',
                         score: 1000 },
                         { name: 'Steve',
                         score: 5}];
        
        highscoreManager.add({ name: 'Steve',
                         score: 5});      
        highscoreManager.add({ name: 'Bill',
                         score: 1000 });
        highscoreManager.add({ name: 'Tom',
                         score: 2000});
        
        var result = highscoreManager.getAll();
        
        expect(result).toEqual(expected);
        done();
    });   
});