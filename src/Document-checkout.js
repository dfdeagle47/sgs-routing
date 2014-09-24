var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());
var async = require('async');

module.exports = function(mongoose){

	_(mongoose.Document.prototype).extend({

		sgRouteCheckoutGet: function(options, callback){
			callback(null, this);
		},

		sgRouteCheckoutPut: function(options, callback){
			if(!options || !options.req){
				return this.sgRouteCheckoutGet(options, callback);
			}

			var me = this;
			this.set(options.req.body, options, function(err){
				if(err){
					return callback(err);
				}
				me.save(callback);
			});
		},	

		sgRouteCheckoutPost: function(options, callback){
			callback(null, this);
		},

		sgRouteCheckoutDelete: function(options, callback){
			this.remove(callback);
		}

	});
};