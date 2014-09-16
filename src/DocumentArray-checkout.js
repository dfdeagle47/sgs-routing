var _ = require('underscore');
	_.str = require('underscore.string');
	_.mixin(_.str.exports());
var async = require('async');

mongoose.Types.DocumentArray.prototype.sgRouteCheckoutGet = function(options, callback){
	callback(null, this);
};

mongoose.Types.DocumentArray.prototype.sgRouteCheckoutPut = function(options, callback){
	callback('Route checkout put on document array not supported');
};	

mongoose.Types.DocumentArray.prototype.sgRouteCheckoutPost = function(options, callback){
	var embeddedDoc = this.create(options.req.data);
	embeddedDoc.sgRouteCheckoutPostFromParent(this, options, callback);
};

mongoose.Types.DocumentArray.prototype.sgRouteCheckoutDelete = function(options, callback){
	callback('Route checkout delete on document array not supported');
};