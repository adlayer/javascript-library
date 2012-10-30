REPORTER = spec
default:
	# Statics
	stats src --totals
	# Runing unit tests
	make test
	# Make documentation
	make docs
docs:
	#yuidoc --server src
	yuidoc
test:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter spec
cov:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter html-cov > cov.html

.PHONY: test docs