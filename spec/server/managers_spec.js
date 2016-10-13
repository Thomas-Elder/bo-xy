var managers = require('../../server/managers');

describe('Managers', function(){
  
  describe('Highscore Manager', 
    function(){
      
      var highscoreManager;

      beforeEach(
        function(done){
          highscoreManager = new managers.Highscores();
          done();
      });
      
      it('should add the given score to the HighscoreManager',
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


  describe('Lobby Manager', 
    function(){
      
      var lobbyManager;

      beforeEach(
        function(done){
          lobbyManager = new managers.Lobbies();
          done();
      });
      
      it('should add the given lobby to the LobbyManager',
        function(done){
          var expected = { name: 'Bill',
                          users: [ 'Bill' ],
                          id: 'A' };
          
          var test = { name: 'Bill',
                      users: [ 'Bill' ],
                      id: 'A' };
          
          lobbyManager.add(test);

          var result = lobbyManager.get('A');
          
          expect(result).toEqual(expected);
          done();
      });
      
      it('should remove the given lobby to the LobbyManager',
        function(done){
          var expected = [{ name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' }];
                
          lobbyManager.add({ name: 'Bill',
                          users: [ 'Bill' ],
                          id: 'A' });
          lobbyManager.add({ name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' });
          
          lobbyManager.remove('A');
          
          var result = lobbyManager.getAll();
          expect(result).toEqual(expected);
          done();
      });
      
      it('should get a lobby with the given key from the LobbyManager',
        function(done){
          var expected = { name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' };
                
          lobbyManager.add({ name: 'Bill',
                          users: [ 'Bill' ],
                          id: 'A' });
          lobbyManager.add({ name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' });
          
          var result = lobbyManager.get('B');               
          expect(result).toEqual(expected);                        
          done();
      });
      
      it('should get all lobbies from the LobbyManager',
        function(done){
          var expected = [{ name: 'Bill',
                          users: [ 'Bill' ],
                          id: 'A' },
                          { name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' }];
                          
          lobbyManager.add({ name: 'Bill',
                          users: [ 'Bill' ],
                          id: 'A' });
          lobbyManager.add({ name: 'Tom',
                          users: [ 'Tom' ],
                          id: 'B' });
          
          var result = lobbyManager.getAll();
          
          expect(result).toEqual(expected);
          done();
      });    
  });
});