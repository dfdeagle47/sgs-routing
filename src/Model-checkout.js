module.exports = function(mongoose){
	mongoose.Model.getRoot = function(options, callback){
		this.find(options.req.data.filters).sort(options.req.data.sort).skip(options.req.data.paginate.offset).limit(options.req.data.paginate.limit).exec(callback);
	};

	mongoose.Model.sgRouteCheckoutGet = function(options, callback){
		this.getRoot(options, callback);
	};

	mongoose.Model.sgRouteCheckoutPut = function(options, callback){
		callback('Route checkout put on model not supported');
	};	

	mongoose.Model.sgRouteCheckoutPost = function(options, callback){
		this.create(options.req.data, callback);
	};

	mongoose.Model.sgRouteCheckoutDelete = function(options, callback){
		callback('Route checkout delete on model not supported');
	};
};