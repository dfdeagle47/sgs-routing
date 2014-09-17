var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var async = require('async')

module.exports = function(mongoose){
	mongoose.Document.prototype.sgRouteGet = function(path, options, callback){
		var camelizedSgRouteGetPath = _('sgRouteGet_'+path).camelize();
		if(typeof this[camelizedSgRouteGetPath] === 'function'){
			return this[camelizedSgRouteGetPath](options, callback);
		}

		var camelizedGetPath = _('get_'+path).camelize();
		if(typeof this[camelizedGetPath] === 'function'){
			return this[camelizedGetPath](options, callback);
		}

		var camelizedPath = _(path).camelize();
		if(typeof this[camelizedPath] === 'function'){
			return this[camelizedPath](options, callback);
		}

		if(this.schema.path(camelizedPath) && this.schema.path(camelizedPath).instance === 'ObjectID'){
			var me = this;
			this.populate(camelizedPath, function(err){
				if(err){
					return callback(err);
				}
				callback(null, me.get(camelizedPath));
			});
		}
		else{
			var val = this.get(camelizedPath);
			if(!val){
				callback('Route not followable');
			}
			else{
				callback(null, this.get(camelizedPath));
			}
		}
	};
};

	

