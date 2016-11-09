var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
	title: String,
	description: String,
	_user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

var List = mongoose.model('list', ListSchema);
