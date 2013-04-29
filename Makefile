REPORTER = spec
default:
	# Check completity of code
	#cr src/* | grep "Maintainability index"
	# Statics
	stats src --totals
	# Lint
	#jshint src/*
	# Runing unit tests
	make test
	# Make documentation
	make docs
docs:
	#yuidoc --server src
	yuidoc
test:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter spec
	yeti test/*/*.html
cov:
	./node_modules/mocha/bin/mocha test/**/*.js --reporter html-cov > cov.html

.PHONY: test docs