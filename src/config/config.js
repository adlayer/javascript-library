exports.config = {
	url: {
		adserver: {
			host: 'dev.jocasta.adlayerapp.com'
		},
		tracker: {
			host: 'dev.tracker.adlayerapp.com'
		}
	},
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
		run: true,
		scriptTagId: 'adlayerScript'
	}
};