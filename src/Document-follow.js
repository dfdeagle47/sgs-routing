var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){

	_(mongoose.Document.prototype).extend({

		sgRouteGet: function(path, options, callback){
			var me = this;
			this.get(path, options, function (err, val) {
				if(err){
					return callback(err);
				}

				//Bad smell message chains (me.schema.path...) (voir schema helpers)
				if(me.schema.path(path) && me.schema.path(path).instance === 'ObjectID' && val instanceof mongoose.Types.ObjectId){
					me.populate(path, function(err){
						if(err){
							return callback(err);
						}
						callback(null, me.get(path));
					});
				}
				else{
					callback(null, val);
				}
			});
		}
	});
};

	

