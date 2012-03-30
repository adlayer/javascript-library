default:
	node build.js

test:
	./node_modules/mocha/bin/mocha test/domain/*.js --reporter spec
	./node_modules/mocha/bin/mocha test/dom/*.js --reporter spec
docs:
	dox < src/domain/event.js > docs/json/domain/event.json | jake docs
	open docs/out/event.md
	# dox --debug < dist/dom-1.0.0.js

.PHONY: test, docs