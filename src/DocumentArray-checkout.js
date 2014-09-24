var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());
var async = require('async');

module.exports = function(mongoose){

	_(mongoose.Types.DocumentArray.prototype).extend({

		sgRouteCheckoutGet: function(options, callback){
			callback(null, this);
		},

		sgRouteCheckoutPut: function(options, callback){
			callback('Route checkout put on document array not supported');
		},

		sgRouteCheckoutPost: function(options, callback){
			var embeddedDoc = this.create(options.req.body);
			embeddedDoc.sgRouteCheckoutPostFromParent(this, options, callback);
		},

		sgRouteCheckoutDelete: function(options, callback){
			callback('Route checkout delete on document array not supported');
		}

	});

};