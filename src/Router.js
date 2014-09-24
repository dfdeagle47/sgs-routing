var async = require('async');
var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

var Router = function(options){
	this.options = _.defaults(options||{}, {
		initiator: 'api'
	});
};

Router.prototype.route = function(options){
	options = _.extend(options||{}, this.options);

	var me = this;
	return function(req, res, next){
		var data = req.data;
		var user = req.user;

		me.followRoute(req, options, function(err, obj){
			if(err){
				return next(err);
			}
			me.checkoutRoute(obj, req, options, function(err, checkoutObj){
				if(err){
					return next(err);
				}
				res.data = checkoutObj;
				next();
			});
		});
	};
};

Router.prototype.followRoute = function(req, options, callback){
	var splitPath = req.route.path.split('/');
	var me = this;
	async.reduce(splitPath, null, function(obj, path, callback){
		if(!path || path === options.initiator){
			return callback(null, path);
		}
		//get model from collection name
		if(obj === options.initiator){
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
			obj.sgRouteGet(path, me.getFollowCheckoutOptions(req), callback);
		}
		else{
			callback(null, obj);
		}
	}, callback);
};

Router.prototype.checkoutRoute = function(obj, req, options, callback){
	var sgRouteCheckoutMeth = 'sgRouteCheckout' + _(req.method.toLowerCase()).capitalize();
	if(typeof obj[sgRouteCheckoutMeth] === 'function'){
		obj[sgRouteCheckoutMeth](this.getFollowCheckoutOptions(req), callback);
	}
	else{
		callback(null, obj);
	}
};

Router.prototype.getFollowCheckoutOptions = function(req){
	return {
		req: req,
		user: req.user,
		data: req.data
	}
};

Router.prototype.getModel = function(collectionName){
	return this.getModelsByCollectionName()[collectionName];
};

Router.prototype.getModelsByCollectionName = function(){
	if(!this._modelsByCollectionName){
		this._modelsByCollectionName = {};
		var me = this;
		_.values(mongoose.models).forEach(function(model){
			me._modelsByCollectionName[model.collection.name] = model;
		});
	}
	return this._modelsByCollectionName;
};

module.exports = Router;

