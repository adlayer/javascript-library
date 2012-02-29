/*
* @class
*/
var Site = function(){
	/*
	* Unique site id
	* @type string
	*/
	this.id;
	/*
	* Site name
	* @type string
	*/
	this.name;
	/*
	* Site status - true for active and  false for inactive
	* @type boolean
	*/
	this.status;
	/*
	* Collection of all allowed domains
	* @type array
	*/
	this.domains;
};