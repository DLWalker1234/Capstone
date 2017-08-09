'use strict';

let movieApp = angular.module("MovieApp", ["ngRoute"])
.constant("FirebaseUrl", "https://movievs-2dac3.firebaseio.com");
// .constant("_", window._);


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
		controller: 'MovieController',
		resolve: {isAuth}
	})
	.otherwise('/');
});