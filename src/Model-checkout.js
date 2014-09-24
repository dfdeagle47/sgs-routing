var _ = require('underscore');

module.exports = function(mongoose){

	_(mongoose.Model).extend({

		getRoot: function(options, callback){
			this.find(options.req.query.filters)
				.sort(options.req.query.sort)
				.skip(options.req.query.paginate.offset)
				.limit(options.req.query.paginate.limit)
				.exec(callback);
		},

		sgRouteCheckoutGet: function(options, callback){
			this.getRoot(options, callback);
		},

		sgRouteCheckoutPut: function(options, callback){
			callback('Route checkout put on model not supported');
		},	

		sgRouteCheckoutPost: function(options, callback){
			this.create(options.req.body, callback);
		},

		sgRouteCheckoutDelete: function(options, callback){
			callback('Route checkout delete on model not supported');
		}

	});

};