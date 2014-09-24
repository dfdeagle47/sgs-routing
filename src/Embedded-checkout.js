var _ = require('underscore');

module.exports = function(mongoose){

	_(mongoose.Types.Embedded.prototype).extend({

		sgRouteCheckoutPut: function(options, callback){
			if(!options || !options.req){
				return this.sgRouteCheckoutGet(options, callback);
			}

			var me = this;
			this.set(options.req.body, options, function(err){
				if(err){
					return callback(err);
				}
				me.parent().save(function(err){
					if(err){
						return callback(err);
					}
					callback(null, me);
				});
			});
		},	

		sgRouteCheckoutPostFromParent: function(parentArray, options, callback){
			parentArray.push(this);
			var me = this;
			this.parent().save(function(err, doc){
				if(err){
					return callback(err);
				}
				callback(null, me);
			});
		},

		sgRouteCheckoutDelete: function(options, callback){
			var me = this;
			this.remove(function(err){
				if(err){
					return callback(err);
				}
				me.parent().save(function(err){
					if(err){
						return callback(err);
					}
					callback(null, me);
				});
			});
		}

	});

};