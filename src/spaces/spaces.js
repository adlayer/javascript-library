/**
* @module spaces
*/
(function(){	
	exports.spaces = (function(){
		var Expandable = require('./expandable_space.js').ExpandableSpace,
			Floater = require('./floater_space.js').FloaterSpace,
			Static = require('./static_space.js').StaticSpace;
		
		return {
			create: function(data){
				data.id = data._id;
				data.width = data.size.width;
				data.height = data.size.height;
				delete data._id;
				delete data.size;

				switch(data.type){
					case 'expandable':
						return new Expandable(data);
					case 'floater':
						return new Floater(data);
					case 'static':
						return new Static(data);
				}
			}
		};
	})();
	
})();