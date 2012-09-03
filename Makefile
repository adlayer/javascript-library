REPORTER = spec
default:
	# Runing unit tests
	make test
	# Build library
	jake
	# Make documentation

test:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter spec
cov:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter html-cov > cov.html

.PHONY: test