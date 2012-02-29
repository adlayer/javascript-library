/**
* @class
* @todo:
*	@public getActiveContent
*		eg new Page().getActiveContent();
*		// {}
*/
var Page = function(){
	/*
	* Unique page id
	* @type string
	*/
	this.id;
	/*
	* Page name
	* @type string
	*/
	this.name;
	/*
	* Collection of page spaces
	* @type array
	*/
	this.spaces;
	/*
	* Page status
	* @type boolean - true for active and false for inactive
	*/
	this.status;
}