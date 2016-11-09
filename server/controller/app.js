var mongoose = require('mongoose');
var User = mongoose.model('users');
var List = mongoose.model('list');

module.exports = {
	register: function(req, res){
		console.log('serverside works')
		var user = new User({name:req.body.current})
		user.validate(function(err){
			if(err){
				console.log('user not created')
				return res.json({error:'username already taken'})
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
 		User.findOne({name:req.body.current},function(err, user){
			if(err){console.log('user not found');return res.json({error:'unrecognized name'})}
			if (user){console.log(user);req.session.name = user.name;return res.json({current:user.name})}
    })},
	getCurrent: function(req, res){
		var name = req.session.name;
		console.log(name)
		res.json({current:name})
	},
	getUsers: function(req, res){
		// User.find({}, function(err, users){
		// 	if(err){
		// 		console.log('db failed users')
		// 	}else{
		// 		console.log(users)
		// 		res.json({users:users})
		// 	}

		// })
		User.find({})
			.populate('lists')
			.exec(function(err, users){
				res.json({users:users})
			})
		// res.json({current:req.session.name})
	},

	newItem: function(req, res){
		console.log('=========================',req.body.name)
		User.findOne({name:req.body.name}, function(err, user){
			// if(err){
			// 	console.log('no user db!')
			// }else{
			// 	console.log('======user*************',user)
			// }
			var list = new List(req.body.item)
			list._user = user._id;
			user.lists.push(list)
			list.save(function(err){
				user.save(function(err){
					console.log(user)
					if(err){
						console.log('list not created')
					}
				})
			})
			res.json()
		})

	},
	getItems: function(req, res){
		List.find()
			.populate('_user')
			.exec(function(err, items){
				res.json({items:items})
			})

	},

	newuser: function(req, res){
		console.log(req.body.name);
		var user = new User({name: req.body.name})
		/* ############################# */
		console.log('***')
		console.log(user)
		console.log('***')
		/* ############################# */
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
