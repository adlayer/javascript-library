# class Site

# constructor 

* param Object attributes

<p>Abstract class for site</p>

<ul>
<li>@property {String} id Unique site id</li>
</ul>

<ul>
<li>@property {String} name Name of site</li>
</ul>

<ul>
<li>@property {Boolean} status true for active and  false for inactive</li>
</ul>

<ul>
<li>@property {Array} domains Collection of all allowed domains</li>
</ul>

<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>

<ul>
<li>@description Find for exact domain or subdomain
<ul><li>@public</li>
<li>@param {String} entry - Domain string</li>
<li>@returns {Boolean} - True when found a domain and false for not</li>
<li>@todo: change to regex</li></ul></li>
</ul>

<ul>
<li>@requires modules in browser
<ul><li>@exports Event as Event</li></ul></li>
</ul>
