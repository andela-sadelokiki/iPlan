var mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var todoSchema = new Schema({
	ownerId: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	dateCreated: {
		type: String
	},
	lastModified: {
		type: String
	}

});

module.exports = mongoose.model('Todo', todoSchema);