(function(){
	
	exports.ads = (function(){
		return {
			Expandable: require('./expandable_space.js').ExpandableSpace,
			Floater: require('./floater_space.js').FloaterSpace,
			Static: require('./static_space.js').StaticSpace
		}
	})();
	
})();