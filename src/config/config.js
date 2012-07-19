exports.config = {
	spaces: {
		standard: {
			run: true,
			adsLimit: 1
		}
		/**
		@example
		hdshdsjsdhsjdhdsh: {
			run: false,
			adsLimit: 2
		}
		**/
	},
	page: {
		run: true
	},
	url: {
		adserver: {
			host: 'couchdb'
		},
		tracker: {
			host: 'dev.tracker.adlayerapp.com'
		}
	}
};