# bo-xy

[![Build Status](https://travis-ci.org/Thomas-Elder/hobby.node.bo-xy.svg?branch=master)](https://travis-ci.org/Thomas-Elder/bo-xy)

Learning some node.js

This app is basically to serve a Javascript game currently called Dodge.

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

##Testing
jasmine is the testing library used, and it's run with `npm test`.

nyc is used to check coverage of tests, it reports at the end of npm test, but the report can also be shown by running `npm run cover`.

