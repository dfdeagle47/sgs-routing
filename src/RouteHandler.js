if(!mongoose.Document.sgRouteCheckoutGet){
	require('./Document-follow');
	require('./Document-checkout');
	require('./Embedded-checkout');
	require('./DocumentArray-follow');
	require('./DocumentArray-checkout');
	require('./Model-follow');
	require('./Model-checkout');
}

var async = require('async');
var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var RouteHandler = function(options){
	this.options = _.defaults(options||{}, {
		initiator: 'api'
	});
};

RouteHandler.prototype.handle = function(req, res, next){
	var data = req.data;
	var user = req.user;

	var me = this;
	this.followRoute(req, function(err, obj){
		if(err){
			return next(err);
		}
		me.checkoutRoute(obj, req, function(err, checkoutObj){
			if(err){
				return next(err);
			}
			res.data = checkoutObj;
			next();
		});
	});
};

RouteHandler.prototype.followRoute = function(req, callback){
	var splitPath = req.route.path.split('/');
	var me = this;
	async.reduce(splitPath, null, function(obj, path, callback){
		if(!path || path === me.options.initiator){
			return callback(null, path);
		}
		//get model from collection name
		if(obj === me.options.initiator){
			return callback(null, me.getModel(path));
		}
		if(_(path).startsWith(':')){
			var key = path.slice(1);
			var value = req.params[key];
			if(_(key.toLowerCase()).endsWith('id')){
				key = 'id';
			}
			var path = {};
			path[key] = value;
		}

		if(typeof obj.sgRouteGet === 'function'){
			obj.sgRouteGet(path, me.getOptions(req), callback);
		}
		else{
			callback(null, obj);
		}
	}, callback);
};

RouteHandler.prototype.checkoutRoute = function(obj, req, callback){
	var sgRouteCheckoutMeth = 'sgRouteCheckout' + _(req.method.toLowerCase()).capitalize();
	if(typeof obj[sgRouteCheckoutMeth] === 'function'){
		obj[sgRouteCheckoutMeth](this.getOptions(req), callback);
	}
	else{
		callback(null, obj);
	}
};

RouteHandler.prototype.getOptions = function(req){
	return {
		req: req,
		user: req.user,
		data: req.data
	}
};

RouteHandler.prototype.getModel = function(collectionName){
	return this.getModelsByCollectionName()[collectionName];
};

RouteHandler.prototype.getModelsByCollectionName = function(){
	if(!this._modelsByCollectionName){
		this._modelsByCollectionName = {};
		var me = this;
		_.values(mongoose.models).forEach(function(model){
			me._modelsByCollectionName[model.collection.name] = model;
		});
	}
	return this._modelsByCollectionName;
};

module.exports = function(options){
	var routeHandler = new RouteHandler(options);
	return routeHandler.handle.bind(routeHandler);
};

