/**
* @class Factory of spaces
**/
var SpaceFactory = function(){};

/** 
* @static
*/
SpaceFactory.transform = function transform(spaceModel){
	var actSpace = SpaceFactory.create(spaceModel._id, spaceModel.type);
	merge(actSpace, spaceModel);
	
	actSpace.id = spaceModel._id;					
	actSpace.render();
};


/** 
* @static 
* @param {String} id
* @param {String} type
* @return {Object}
*/
SpaceFactory.create = function(id,type){
	var ExpandableSpace = require('./expandable_space').expandable_space;
	var FloaterSpace = require('./floater_space').floater_space;
	var StaticSpace = require('./static_space').static_space;
	
	if(type === "expandable"){
		return new ExpandableSpace(id);
	}
	else if (type === "floater") {
		return new FloaterSpace(id);
	}
	else {
		return new StaticSpace(id);
	}
};
exports.space_factory = SpaceFactory;