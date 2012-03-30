default:
	# Runing unit tests
	make test
	# Build library
	jake
	# Make documentation
	jake docs

test:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter spec

.PHONY: test