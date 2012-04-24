# class Ad

# constructor 

* param Object attributes

<p>Abstract class for ads</p>

<ul>
<li>@property {String} id Id of ad
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {String} name Name of ad creative
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {String} campaign_id Id to campaign that belongs to
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {String} type Ad type
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {String} file Path to ad file
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {String} link destiny link
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {Boolean} status Ad status
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@property {Object} alternative Alternative Ad is another instance of Ad with graceful degradation
<ul><li>@public</li></ul></li>
</ul>

<ul>
<li>@method __construct
<ul><li>@private</li>
<li>@returns {Object} return this to allow chain pattern</li></ul></li>
</ul>
# exports Ad as Ad


<p>@requires modules in browser</p>
