'use strict';

movieApp.controller("MovieController", function($scope, $window, MovieFactory, UserFactory) {
		MovieFactory.getImdb250();
		MovieFactory.getPopularMovies1();
		MovieFactory.getPopularMovies2();
		

	

});
