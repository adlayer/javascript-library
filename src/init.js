(function(){
	var contentLoaded = require('./utils/contentloaded').contentloaded;
	var page = require('./page').page;

	page.getData(function(content){
		// Waiting for page ready
		page.on('ready', function(){
			page.spaces = content.spaces;
			page.scan(SpaceFactory.transform);
		});

		// Emit ready
		contentLoaded(global, function(){
			page.emit('ready');
		});
	});
})();