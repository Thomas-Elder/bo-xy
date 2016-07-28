var LobbyManager = require('../../../server/models/lobbyManager');

describe('Lobby Manager', 
  function(){
    
    var lobbyManager;

    beforeEach(
      function(done){
        lobbyManager = new LobbyManager();
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