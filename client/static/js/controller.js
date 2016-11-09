var app = angular.module('app', ['ngRoute']);


/* FACTORYFACTORYFACTORYFACTORYFACTORY */
app.factory('Names', function($http){
	var Names = {};
	Names.current = "";
	Names.users = [];
	Names.items = [];
	Names.user = [];

	Names.login = function(data, callback, callback2, callback3, callback4){
		$http.post('/login', {current:data})
			.success(function(res){
				if(res.current){console.log('no prbs');Names.current = res.current;callback();callback2()}
				if(res.logError){Names.logError = res.logError;console.log('login probs');callback3();callback4()}
			})
			.error(function(err){console.log('failed!')})
	}

	Names.register = function(data, callback, callback2, callback3, callback4){
		$http.post('/register', {current:data})
			.success(function(res){
				if(res.current){
					console.log('current exists');Names.current = res.current;callback();callback2()
				}
				if(res.error){Names.error=res.error;callback3();callback4()
				}
			})
			.error(function(err){console.log('failed!')})
	}

	Names.getCurrent = function(callback){
		$http.get('/getCurrent')
			.success(function(res){Names.current = res.current;callback();console.log('success!')})
			.error(function(err){console.log('failed!')})
	}

	Names.getUsers = function(callback){
		$http.get('/getUsers')
		.success(function(res){Names.users = res.users;callback();console.log('success!')})
		.error(function(err){console.log('failed!')})
	}

	Names.newItem = function(data){
		$http.post('/newItem', {item:data, name:Names.current})
		.success(function(res){console.log('success!')})
		.error(function(err){console.log('failed!')})
	}
	Names.getItems = function(callback){
		$http.get('/getItems')
		.success(function(res){Names.items = res.items;callback();console.log('success!')})
		.error(function(err){console.log('failed!')})
	}
	Names.showUser = function(data, callback){
		callback(data)
		Names.user = Names.users[data]
		console.log(Names.user)
	}
	Names.logout = function(){
		Names.current = [];
				
	}
	return Names;
});



/* CONTROLLERCONTROLLERCONTROLLERCONTROLLERCONTROLLER */
app.controller('dashController', ['$scope', '$location', 'Names', function($scope, $location, Names){
	$scope.current = [];
	$scope.users = [];
	$scope.items = [];

	$scope.locate = function(data){
		$location.url(data)
	}
	$scope.call = function(callback){
		callback()
	}
	$scope.users = function(){
		$scope.users = Names.users;
	}
	$scope.getUsers = function(){
		Names.getUsers(function(){$scope.users = Names.users});
	}
	$scope.newItem = function(data){
		Names.newItem(data)
		// $scope.getItems($scope.items)
		$scope.item = {};
		// $scope.call($scope.getItems)
		$scope.locate('/dash')
	}
	$scope.getItems = function(){
		Names.getItems(function(){$scope.items = Names.items});
	}
	$scope.logout = function(){
		Names.logout()
		console.log('logout')
		$location.url('/')
	}
	$scope.test = function(){console.log('test')}
	$scope.getCurrent = function(){
		Names.getCurrent(function(){$scope.current = Names.current});
	}
	$scope.getCurrent()
	$scope.getUsers()
	$scope.getItems()
	
}]);



/* homeController CONTROLLERCONTROLLERCONTROLLERCONTROLLERCONTROLLER */
app.controller('homeController', ['$scope', '$location', 'Names', function($scope, $location, Names){
	$scope.error = "";
	$scope.login = function(data){
		Names.login(data, $scope.getCurrent, $scope.dash, $scope.home, $scope.getLogError)
		$scope.name = "";
	}
	$scope.register = function(data){
		// $scope.current = ['no user'];
		Names.register(data,$scope.getCurrent,$scope.dash,$scope.home, $scope.getError)
		$scope.newUser = "";
	}
	$scope.getError = function(){
		$scope.error = Names.error;
	}
	$scope.getLogError = function(){	
		$scope.logError = Names.logError;
	}
	$scope.getCurrent = function(){
		$scope.current = Names.current;
	}
	$scope.dash = function(){
		$location.url('/dash')
	}
	$scope.home = function(){
		$location.url('/')
	}
}]);





/* CONFIGCONFIGCONFIGCONFIGCONFIGCONFIGCONFIG */
app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller: 'homeController',
		controllerAs: 'homeCtrl',
		templateUrl: './partials/home.html'
	})
	.when('/dash',{
		controller: 'dashController',
		controllerAs: 'dashCtrl',
		templateUrl: './partials/dash.html'
	})
	.when('/user',{
		controller: 'userController',
		controllerAs: 'userCtrl',
		templateUrl: './partials/user.html'
	})
	.otherwise({
		redirectTo: '/'
	});
})
