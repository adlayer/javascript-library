var jsdom  = require("jsdom").jsdom,
	context = jsdom(null),
	window = context.createWindow(),
	document = window.document;
module.exports = document;