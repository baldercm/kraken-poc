# kraken-poc Makefile

# paths
NODE_MODULES=./node_modules/.bin

# commands
MOCHA=NODE_ENV=test $(NODE_MODULES)/mocha
ISTANBUL=NODE_ENV=test $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha

default: test

start:
	$(NODE_MODULES)/nodemon server.js

dev: pretest
	NODE_ENV=test $(NODE_MODULES)/nodemon --exec $(NODE_MODULES)/mocha --reporter min

test: pretest
	$(MOCHA)

test-unit: pretest
	$(MOCHA) --invert --grep E2E

test-e2e: pretest
	$(MOCHA) --grep E2E

test-docker: jshint
	$(MOCHA)

test-travis: pretest
	$(ISTANBUL) --report lcovonly

coverage: pretest
	rm -Rf coverage
	$(ISTANBUL)

pretest: jshint preparetestdb

jshint:
	$(NODE_MODULES)/jshint .

preparetestdb:
	mongo noderest-e2e scripts/preparedb.js

.PHONY: test
