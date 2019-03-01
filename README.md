# bo-xy

[![Build Status](https://travis-ci.org/Thomas-Elder/hobby.node.bo-xy.svg?branch=master)](https://travis-ci.org/Thomas-Elder/bo-xy)

Learning some node.js

This app is basically to serve a Javascript game currently called Dodge.

The app is hosted on Heroku, there is a bo-xy pipeline with 3 apps, dev, staging and production.

These three apps are linked to similarly named branches in this repo. Once pushed to Github, tests are run with Travis, and if they all pass the commit is deployed to Heroku.

dev:
* Heroku app: bo-xy-dev - https://bo-xy-dev.herokuapp.com/
* Github branch: dev

staging:
* Heroku app: bo-xy-staging - https://bo-xy-staging.herokuapp.com/
* Github branch: staging

production:
* Heroku app: bo-xy - https://bo-xy.herokuapp.com/
* Github branch: master

##Testing
jasmine is the testing library used, and it's run with `npm test`.

nyc is used to check coverage of tests, it reports at the end of npm test, but the report can also be shown by running `npm run cover`.

##Workflow
###Tools
Two tools are used to make bo-xy easier to work on.

browserify bundles required files to make them easier to include. Running `npm build` bundles all single player box game scripts into client_sn.js. The build script also pipes the output of browserify through uglify.js to minify.

watchify watches the same set of required files, and rebundles anytime a change is saved. Running `npm watch` starts watchify.

Required files are listed in `client/browserify.js`.

###Git flow and branches
Trying to use something that looks a bit like gitflow: 
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

Haven't done a great job being as strict about this as I should but that's the goal.