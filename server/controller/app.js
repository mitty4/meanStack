var mongoose = require('mongoose');
var User = mongoose.model('users');
var List = mongoose.model('lists');

module.exports = {
	register: function(req, res){
		console.log('serverside works')
		var user = new User({name:req.body.current})
		user.validate(function(err){
			if(err){
				console.log('user not created')
				return res.json({registerError:'username already taken'})
			}
			user.save(function(err, yes){
				if(err){
					console.log('user not created')
				}
				req.session.name = user.name
				return res.json({current:user.name})
			})
		})
	},
	login: function(req, res){
		console.log(req.body.current)
 		User.findOne({name:req.body.current},'name',function(err, user){
			if (user){
				req.session.name = user.name;	
				return res.json({current:user.name})
			}
			else{
				console.log('user not found');
				return res.json({loginError:'unrecognized name'})
			}
    	})
	},
	getCurrent: function(req, res){
		var name = req.session.name;
		res.json({current:name})
	},
	getUsers: function(req, res){
		User.find({})
			.populate('lists')
			.exec(function(err, users){
				res.json({users:users})
		})
	},
	getItems: function(req, res){
		List.find()
			.populate('_user')
			.exec(function(err, items){
				res.json({items:items})
			})
	},
	newItem: function(req, res){
		User.findOne({name:req.body.name}, function(err, user){
			var list = new List(req.body.item)
			list._user = user._id;
			user.lists.push(list)
			list.save(function(err){
				user.save(function(err){
					if(err){
						console.log('list not created')
					}
				})
			})
			res.json()
		})
	},
	newuser: function(req, res){
		var user = new User({name: req.body.name})
		user.save(function(err) {
      		if(err){
        		console.log("something went wrong");
      		} else {
       			 res.json()
      		}
    	})
	},
	logout: function(req, res){
		req.session._id = null;
		console.log(req.session)
		res.json()
	}

}
