var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());

mongoose.Model.sgRouteGet = function(path, options, callback){
	if(typeof path === 'string'){
		this._sgRouteGetFromFixPath(path, options, callback);
	}
	else{
		this._sgRouteGetFromVariablePath(path, options, callback);
	}
};

mongoose.Model._sgRouteGetFromVariablePath = function(path, options, callback){
	if(path.id){
		this.findById(path.id, callback);
	}
	else if(path.slug){
		this.findOne({slug: path.slug}, callback);
	}
	else{
		callback('Model default routing require an id or slug');
	}
};

mongoose.Model._sgRouteGetFromFixPath = function(path, options, callback){
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

	callback('No path ' + path + ' in model');
};