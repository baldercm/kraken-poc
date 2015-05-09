# kraken-poc Makefile

NODE_MODULES=./node_modules/.bin


default: test

start:
	$(NODE_MODULES)/nodemon server.js

dev: pretest
	NODE_ENV=test $(NODE_MODULES)/nodemon --exec $(NODE_MODULES)/mocha --reporter min

test: pretest
	NODE_ENV=test $(NODE_MODULES)/mocha

test-docker: jshint
	NODE_ENV=docker $(NODE_MODULES)/mocha

test-travis: pretest
	NODE_ENV=test $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha --report lcovonly

coverage: pretest
	rm -Rf coverage
	NODE_ENV=test $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha

pretest: jshint preparetestdb

jshint:
	$(NODE_MODULES)/jshint .

preparetestdb:
	mongo noderest-e2e scripts/preparedb.js

.PHONY: test
