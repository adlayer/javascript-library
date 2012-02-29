/**
* @class
* @todo:
*	@static create
*		eg Space.create('teste', {});
*		// {}
*	@public getAd
*		eg new Space().getAd('1234');
*		// [{},{},{}]
*	@public save
*		eg new Event().save(function(){});
*		// null
*	@public place
*		eg new Event().place(new Ad());
*		// {}
*/
var Space = function(){
	/*
	* Unique page id
	* @type string
	*/
	this.id;
	/*
	* Space type
	* @type string
	*/
	this.type;
	/*
	* Space status - true for active and false for inactive
	* @type boolean
	*/
	this.status;
	/*
	* Collection of ads linked to space
	* @type array
	*/
	this.ads;
};