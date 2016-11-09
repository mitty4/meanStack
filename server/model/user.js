var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UsersSchema = new mongoose.Schema({
	name: {type:String,unique:true,required:true},
	lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'list'}]
	
});

UsersSchema.plugin(uniqueValidator);
var Users = mongoose.model('users', UsersSchema);
