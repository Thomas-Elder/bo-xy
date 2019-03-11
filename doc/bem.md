#BEM
So reading into BEM as a methodology for structuring boxy seems like it could be a good 
idea. It stands for Block, Element, Modifier. Block being an independent part or chunk 
of the site, Element being a chunk necessarily belonging to a block, and a Modifier 
being some way in which the element or block is modified.

##Pages
Trying to break up the pages into blocks for a start, to start understanding how this 
all sort of fits.

###Layout  
Block:header
  Element:link
Block:nav
  Element:link
  Element:link
  Element:link
  Element:link
Block:body
Block:footer
  Element:link 	

###Index
Block:body
  Block:blah

###Single
Block:body
  Block:name
    Element:text field
    Element:button
  Block:game
    Element:game
    Element:hud

###Highscores
Block:body
  Block:scores
    Block:score
      Element:name
      Element:score
    Block:score
      Element:name
      Element:score
    ...

###Mingle
Figure this one out once we’re comfortable with the simpler pages above.

##Files
So there's a few options for file structure, and I'm not really sure what to use. Some
of it seems far too engineered for my tiny project, but practicing the concepts is sort
of the point right.

So at the moment I'm going with a folder for each block, a css file for each block, then
a separate css file for elements of the block. 

client/
  blocks/
    name/	
      name.css
      name__text-field.css
      name__button.css
      name.js
    game/
      game.css
      game__game.css
      game__hud.css
      game.js
    header/
      header.css
      header__link.css
    nav/
      nav.css

    footer/
      footer.css
      footer__link.css
    scores/
      scores.css
    score/
      score.css
      score__name.css
      score__score.css
