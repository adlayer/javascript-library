		# class Event
	
	
		* param Object attributes

 <p>Create any event</p>

 <ul>
<li>@property {Object} date Instance of current date
<ul><li>@private</li></ul></li>
</ul>

 <ul>
<li>@property {String} type Event type
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} campaign_id Campaign Id
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} ad_id Ad id
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} space_id Space id
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} site_id Site id
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} page_url Url of the current page
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} date Date ISO 8601 format
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} time Time of event
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} hour
<ul><li>@description First part of a time iso</li>
<li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} ip Visitor ip
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@property {String} browser User agent or browser
<ul><li>@public</li></ul></li>
</ul>

 <ul>
<li>@method getFullDate
<ul><li>@privileged</li>
<li>@returns {String} Even if date is not converted to string return ISOString</li></ul></li>
</ul>

 <ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>

 <ul>
<li>@property {Array} required List of all required attributes
<ul><li>@static</li></ul></li>
</ul>

 <ul>
<li>@method track
<ul><li>@static</li>
<li>@returns {Object} return the result of method save</li></ul></li>
</ul>

 <ul>
<li>@method getDate
<ul><li>@public</li>
<li>@returns {String} The second part of a fulldate splited in T character</li></ul></li>
</ul>

 <ul>
<li>@method getTime
<ul><li>@public</li>
<li>@returns {String} he second part of a fulldate splited in T character</li></ul></li>
</ul>

 <ul>
<li>@method getHour
<ul><li>@public</li>
<li>@returns {String || Boolean} String of hour or false</li></ul></li>
</ul>

 <ul>
<li>@method validate
<ul><li>@public</li>
<li>@returns {Boolean} true for all attributes and false if any is missing</li></ul></li>
</ul>

 <ul>
<li>@method toQuery
<ul><li>@public</li>
<li>@returns {String} convert object to network string</li></ul></li>
</ul>

 <ul>
<li>@method save
<ul><li>@public</li>
<li>@returns {Error} convert object to network string</li></ul></li>
</ul>

 <ul>
<li>@requires modules in browser
<ul><li>@exports Event as Event</li></ul></li>
</ul>
