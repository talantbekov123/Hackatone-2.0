module.exports = function(url) {
	var mongoose = require('mongoose');
	var glob = require('glob');
	
	db = {
	    connect: function(databaseUrl) {
	        return mongoose.connect(databaseUrl);
	    }
	};
	
	/* get all shemas */
	var models = glob.sync(url);
	models.forEach(function(model) {
		/* reconstruct model path */
		model = '.' + model.substring(url.length - 12);
	    require(model)(db);
	})

	return db;
}