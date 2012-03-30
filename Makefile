default:
	node build.js

test:
	./node_modules/mocha/bin/mocha test/domain/*.js --reporter spec
	./node_modules/mocha/bin/mocha test/dom/*.js --reporter spec

.PHONY: test