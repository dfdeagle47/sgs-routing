module.exports = function(mongoose){

	if(!mongoose.Document.prototype.sgRouteCheckoutGet){
		require('./Document-follow')(mongoose);
		require('./Document-checkout')(mongoose);
		require('./Embedded-checkout')(mongoose);
		require('./DocumentArray-follow')(mongoose);
		require('./DocumentArray-checkout')(mongoose);
		require('./Model-follow')(mongoose);
		require('./Model-checkout')(mongoose);
	}

	return require('./Router')(mongoose);
};