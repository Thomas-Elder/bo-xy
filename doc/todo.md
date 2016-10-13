# TODO

## STRUCTURE

Ok so the bo-xy project is getting a bit messy and needs a re-do, with some engineering 
this time.

So going to try suss a structure to help organise things better.

root/
  app.js

  server/
    server.js
    config.js
    
    events.js
    
    game/
      engine.js
      main.js
      
      box/
        playerBox.js
        enemyBox.js
        buffBox.js
        
    controllers/
      controllers.js
      indexController.js
      gameController.js 
    
    views/
       
  client/
    game/
      engine.js
      main.js
      display.js
      
      box/
        playerBox.js
        enemyBox.js
        buffBox.js 

  spec/
    // test things.
  
  
  typings/
  node_modules/
  doc/
  
Structure... semi tick. Ok but moving on. 

Stories. Or ... Sequences. Basically what needs to happen, and who needs to do it. 

Ok first Lobbies. The client navigates to /lobbies... then

Client.main.js                | Server.events.js 
reg io(/lobby)  
                                ack connection

Done. Next the user selects either create, or join. 
              
Client.main.js                | Server.events.js 
emit (new)                          
                                ack new
                                create new room
                                assign socket to room
                                call LobbyManager.create() // perhaps we pass the initial socket.io to this to identify the lobby?
                                emit new
ack new
show lobby dashboard (play/leave)

So I think we can show the lobby dash on the same page, just have a hidden div which is populated when create/join is clicked.
Then shown.

Ok at this point I think we'll then redirect users to a new page when they hit play.
Like /dodge. Then it loads the scripts for the game and the game canvas etc. 


# Milestone 1.0

## Goals

Ok so I need to focus on 1.0 and what should be included. I've gotten a bit carried
away with sockets and multiplayer and it's gone a bit haywire.

After a bit of a break, I've decided 1.0 should re-scoped to only include single player dodge
box, with a highscore page. Potentially adding some more game features... potentially.

How this is achieved is a separate matter. I think it might be an idea to maintain
server-controlled enemies, to make the transition to multiplayer a bit easier. I've also made
a lot of progress on the lobby page and functionality, so I don't want that thrown out or 
compromised. 

The structure of the game is going to be a bit different, but most of the code will just be copy
pasted over so, shouldn't be a lot of work. 

Testing for the game code is essential. 

 