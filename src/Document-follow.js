var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){

	_(mongoose.Document.prototype).extend({

		sgRouteFollowPath: function (path, options) {
			return path;
		},

		sgRouteFollow: function (path, options, callback) {
			var initialPath = path;
			path = this.sgRouteFollowPath(initialPath, options);

			if(options.req.method === 'POST' && this.sgRouteIsLastPart(initialPath, options) && typeof this[path] === 'function'){
				return this.do(path, options, callback);
			}

			var me = this;
			this.get(path, options, function (err, val) {
				if(err){
					return callback(err);
				}

				if(me.schema.isRef(path) && val instanceof mongoose.Types.ObjectId || me.schema.isRefArray(path)){
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
		},

		sgRouteIsLastPart: function(path, options){
			var splitPath = options.req.splitPath;
			return _(splitPath[splitPath.length-1]).camelize() === path;
		}

	});
};

	

