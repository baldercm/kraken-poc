# kraken-poc Makefile

NODE_MODULES=./node_modules/.bin
JSHINT_SOURCES=./controllers ./lib ./models ./test


default: test

start:
	$(NODE_MODULES)/nodemon server.js

test: pretest
	NODE_ENV=test $(NODE_MODULES)/mocha

dev: pretest
	NODE_ENV=test $(NODE_MODULES)/nodemon --exec $(NODE_MODULES)/mocha --reporter min

coverage: pretest
	rm -Rf coverage
	NODE_ENV=test $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha

pretest: jshint preparetestdb

jshint:
	$(NODE_MODULES)/jshint $(JSHINT_SOURCES)

preparetestdb:
	mongo noderest-e2e scripts/preparedb.js

.PHONY: test
