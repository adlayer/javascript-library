exports.name = 'api';
exports.files = [
	'src/module.js',
	'src/node_modules/querystring.js',
	'src/node_modules/events.js',
	
	'src/connection/configs.js',
	'src/keys.js',
	'src/utils/merge.js',
	'src/utils/loadscript.js',
	'src/utils/contentloaded.js',
	'src/context.js',
	
	'src/request/http_request.js',
	'src/request/jsonp_request.js',
	'src/request/img_request.js',
	
	'src/connection/connection.js',
	'src/connection/connection_manager.js',
	
	'src/connection/connections.js',
	
	'src/size.js',
	'src/format.js',

	'src/models/salvable.js',	
	'src/models/log.js',
	'src/models/click.js',
	'src/models/impression.js',
	
	'src/html/html_tag.js',
	
	'src/html/flash/flash.js',
	'src/html/flash/embed_tag.js',
	'src/html/flash/object_tag.js',
	
	'src/html/anchor_tag.js',
	'src/html/img_tag.js',
		
	'src/ads/ad.js',
	'src/ads/img_ad.js',
	'src/ads/swf_ad.js',
	'src/ads/ads_factory.js',
		
	'src/spaces/ispace.js',
	'src/spaces/space.js',
	'src/spaces/expandable_space.js',
	'src/spaces/floater_space.js',
	'src/spaces/static_space.js',
	'src/spaces/space_factory.js',
	
	'src/page.js',
	'src/init.js',
	'src/api.js'
];