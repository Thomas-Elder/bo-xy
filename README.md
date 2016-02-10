# bo-xy

[![Build Status](https://travis-ci.org/Thomas-Elder/bo-xy.svg?branch=master)](https://travis-ci.org/Thomas-Elder/bo-xy)

Learning some node.js and trying to make a boxy 1945 multiplayer game. 

The app is hosted on Heroku, there is a bo-xy pipeline with 3 apps, dev, staging and production.

These three apps are linked to similarly named branches in this repo and commits are automatically deployed once pushed to github and passing Travis. 

dev:
* URL: bo-xy-dev.herokuapp.com
* Heroku app: bo-xy-dev
* Github branch: dev

staging:
* URL: bo-xy-staging.herokuapp.com
* Heroku app: bo-xy-staging
* Github branch: staging

production:
* URL: bo-xy.herokuapp.com
* Heroku app: bo-xy
* Github branch: master
