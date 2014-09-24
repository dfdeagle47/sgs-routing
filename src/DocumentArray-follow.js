var _ = require('underscore');

module.exports = function(mongoose){

	_(mongoose.Types.DocumentArray.prototype).extend({

		sgRouteGet: function(path, options, callback){
			if(path.id){
				callback(null, this.id(path.id));
			}
			else{
				callback('DocumentArray default routing require an id');
			}
		}

	});

};