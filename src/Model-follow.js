var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

module.exports = function(mongoose){

	_(mongoose.Model).extend({

		sgRouteGet: function(path, options, callback){
			if(typeof path === 'string'){
				this._sgRouteGetFromFixPath(path, options, callback);
			}
			else{
				this._sgRouteGetFromVariablePath(path, options, callback);
			}
		},

		_sgRouteGetFromVariablePath: function(path, options, callback){
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

		_sgRouteGetFromFixPath: function(path, options, callback){
			this[options.action ? 'do' : 'get'](path, options, callback);
		}

	});

};