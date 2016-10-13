# Bugs

## CSS for dodge page

One page in 5 doesn't load my css file.

Ok so there are 5 pages in this site, all of which extend the one layout.jade page. The layout page is 
where the css file is specified.

If you go here; http://bo-xy-dev.herokuapp.com/ you'll see the home page with some uber-basic css. Click any
page and it looks roughly the same. Click the DODGE link and the CSS is gone.

Home; http://puu.sh/nCbjN/a8344fd20e.png

Dodge; http://puu.sh/nCbkP/18b9ceaae7.png

Weird! Given they share the same layout page, where the CSS file is specified. Ok so I'm looking at the request logs as I go through different pages;

Home; http://puu.sh/nCby7/421ddb17d7.png

Lobbies; http://puu.sh/nCbzm/09616a05ea.png

Highscores; http://puu.sh/nCbAX/45fc13b530.png

Dodge; http://puu.sh/nCbC0/6ae4d11709.png

Ok so there's something fucky going on here. 'GET /dodge' returns 303, then the request is redirected to 
'GET /dodge/', and the subsequent GET for the CSS file is now pointing at a non-existent folder and 
non-existent file in that folder. How this returns 200, I've no idea. 

Why the shit is this happening? Here's where I set up the routes; http://puu.sh/nCbXN/45514c97e7.png

If I change the dodge route to point at a different controller, say home again, I still get the same
funky behaviour but now with the home page; http://puu.sh/nCbWY/0fe4eed3e8.png

In this state, when you click the link to dodge, you get the home page rendered without CSS. 

Huh... what if I change the route name to 'dodgex', like for some reason 'dodge' is reserved; http://puu.sh/nCc4g/7c3085c529.png

Wow it worked; http://puu.sh/nCc9H/a2e8d020b8.png

And the page is rendered correctly; http://puu.sh/nCcai/1f95700471.png 

Ok so why?! Maybe it's because there's a folder named 'dodge' in the static directory I set up;
http://puu.sh/nCcfo/a1d28af781.png

So when a request comes through for /dodge, express looks in the static directory I've specified for static content, finds
the folder matching the request, and attempts to serve the CSS for this request, from this folder.

The gist is that my route had the same name as a folder in the directory I specified for serving static files. 
So I'd set; app.use(express.static(path.join(__dirname, '../client')));

And there was a folder 'client/dodge/', and I have a route set; app.get('/dodge', controllers.dodge);

So when a request came for '/dodge' the app tried looking for static content in 'client/dodge/'. 


Ok so the fix is you can specify a prefex for static content when setting up the static content folder;
app.use('/static', express.static(path.join(__dirname, '../client')));

So now when you load static content it's prefixed with 'static', which is not an existent path, so there's
no issues any more. 

BUG FIXED.

