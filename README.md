# bo-xy

[![Build Status](https://travis-ci.org/Thomas-Elder/bo-xy.svg?branch=master)](https://travis-ci.org/Thomas-Elder/bo-xy)

Learning some node.js

This app is basically to serve a Javascript game currently called Dodge. I'm pretty new to node.js so creating a website around this simple game seemed like a good place to start.

Originally there was just a single player game where you dodged falling boxes for points and had three lives. More recently there has been work on implementing a multiplayer version of this. Milestone 1.0 however will be focused on completing the single player game and associated pages.

The app is hosted on Heroku, there is a bo-xy pipeline with 3 apps, dev, staging and production.

These three apps are linked to similarly named branches in this repo. Once pushed to Github, tests are run with Travis, and if they all pass the commit is deployed to Heroku.

dev:
* Heroku app: bo-xy-dev
* Github branch: dev

staging:
* Heroku app: bo-xy-staging
* Github branch: staging

production:
* Heroku app: bo-xy
* Github branch: master
