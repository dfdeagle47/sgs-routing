var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

module.exports = function(mongoose){

	_(mongoose.Model).extend({

		sgRouteFollow: function(path, options, callback){
			if(typeof path === 'string'){
				this._sgRouteFollowFromFixPath(path, options, callback);
			}
			else{
				this._sgRouteFollowFromVariablePath(path, options, callback);
			}
		},

		_sgRouteFollowFromVariablePath: function(path, options, callback){
			if(path.id){
				this.findById(path.id, callback);
			}
			else if(path.slug){
				this.findOne({slug: path.slug}, callback);
			}
			else{
				callback('Model default routing require an id or slug');
			}
		},

		_sgRouteFollowFromFixPath: function(path, options, callback){
			this[options.action ? 'do' : 'get'](path, options, callback);
		}

	});

};