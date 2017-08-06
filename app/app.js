'use strict';

let movieApp = angular.module("MovieApp", ["ngRoute"])
.constant("FirebaseUrl", "https://movievs.firebaseio.com/");

console.log("app start");

let isAuth = (UserFactory) => {
	return new Promise( (resolve, reject) => {
		UserFactory.isAuthenticated()
		.then( (userBoolean) => {
			if (userBoolean) {
				resolve();
			} else {
				reject();
			}
		});
	});
};

movieApp.config( ($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/logIn.html',
		controller: 'UserController'
	})
	.when('/movie', {
		templateUrl: 'partials/movie.html',
		controller: 'movieController',
		resolve: {isAuth}
	})
	.otherwise('/');
});