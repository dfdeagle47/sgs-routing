var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());
var async = require('async');

mongoose.Document.prototype.sgRouteCheckoutGet = function(options, callback){
	callback(null, this);
};

mongoose.Document.prototype._sgRouteCheckoutSet = function(options, callback){
	if(!options || !options.req || !options.req.data){
		return this.sgRouteCheckoutGet(options, callback);
	}

	var data = options.req.data;
	var me = this;
	async.each(_(data).keys(), 
	function(key, callback){
		var camelizedSetPath = _('set_'+key).camelize();
		if(typeof this[camelizedSetPath] === 'function'){
			me[camelizedSetPath](data[key], options, callback);
		}
		else{
			me.set(key, data[key]);
			callback();
		}
	}, callback);
};	

mongoose.Document.prototype.sgRouteCheckoutPut = function(options, callback){
	var me = this;
	this._sgRouteCheckoutSet(options, function(err){
		if(err){
			return callback(err);
		}
		me.save(callback);
	});
};	

mongoose.Document.prototype.sgRouteCheckoutPost = function(options, callback){
	callback(null, this);
};

mongoose.Document.prototype.sgRouteCheckoutDelete = function(options, callback){
	this.remove(callback);
};