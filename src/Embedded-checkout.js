module.exports = function(mongoose){
	mongoose.Types.Embedded.prototype.sgRouteCheckoutPut = function(options, callback){
		var me = this;
		this._sgRouteCheckoutSet(options, function(err){
			if(err){
				return callback(err);
			}
			me.parent().save(function(err){
				if(err){
					return callback(err);
				}
				callback(null, me);
			});
		});
	};	

	mongoose.Types.Embedded.prototype.sgRouteCheckoutPostFromParent = function(parentArray, options, callback){
		parentArray.push(this);
		var me = this;
		this.parent().save(function(err, doc){
			if(err){
				return callback(err);
			}
			callback(null, me);
		});
	};

	mongoose.Types.Embedded.prototype.sgRouteCheckoutDelete = function(options, callback){
		var me = this;
		this.remove(function(err){
			if(err){
				return callback(err);
			}
			me.parent().save(function(err){
				if(err){
					return callback(err);
				}
				callback(null, me);
			});
		});
	};
};