'use strict';

movieApp.controller("UserController", function($scope, $window, UserFactory) {

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
		console.log("Register Button Clicked!");
		UserFactory.createUser($scope.account)
		.then( (userData) => {
			console.log("new user made", userData);
			$scope.login();
		});
	};

	$scope.login = () => {
		UserFactory.loginUser($scope.account)
		.then( (userData) => {
			console.log("Log In", userData);
			$window.location.href = '#!/home';
		});
	};
});