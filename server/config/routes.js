var mongoose = require('mongoose');
var controller = require('../controller/app.js');

module.exports = function(app) {
  app.post('/login', function(req, res, data){
    controller.login(req, res);
  })
  app.post('/register', function(req, res, data){
	controller.register(req, res);
  }),
  app.get('/getCurrent', function(req, res, data){
  	controller.getCurrent(req, res);
  })

   app.get('/getUsers', function(req, res, data){
  	controller.getUsers(req, res);
  })

   app.post('/newItem', function(req, res, data){
   	controller.newItem(req, res);
   })

   app.get('/getItems', function(req, res, data){
   	controller.getItems(req, res);
   })

  app.post('/dash', function(req, res, data) {
    controller.newuser(req, res);
  })
   app.get('/logout', function(req, res, data){
  	controller.logout(req, res);
  })
}
