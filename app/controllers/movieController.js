'use strict';

movieApp.controller("MovieController", function($scope, $window, MovieFactory, UserFactory) {

		let rankMoviesArr = [];

		let removeMovie = (movie) => {
			let removeMovie = $scope.movies.indexOf(movie);
			$scope.movies.splice(movie, 1);
			console.log("removie", removeMovie);
		};

		let pickRandomMovies = () => {
			let movie1 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
			movie1.poster_path = `https://image.tmdb.org/t/p/w342` + movie1.poster_path;
			movie1.release_date = movie1.release_date.split("-");
			movie1.release_date = movie1.release_date[0];
			let movie2 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
			movie2.poster_path = `https://image.tmdb.org/t/p/w342` + movie2.poster_path;
			movie2.release_date = movie2.release_date.split("-");
			movie2.release_date = movie2.release_date[0];
			$scope.movie1 = movie1;
			$scope.movie2 = movie2;

			console.log("movie scope", $scope.movies);
			// console.log("1", $scope.movie1);
			// console.log("2", $scope.movie2);
		};

		$scope.voteMovie1 = (movie1, movie2) => {
			console.log("vote 1 button");
			movie1.won += 1;
			movie1.totalFights += 1;
			movie1.rank = movie1.won/movie1.totalFights;
			movie2.totalFights += 1;
			console.log($scope.movie1);
			console.log($scope.movie2);
			rankMoviesArr.push(movie1, movie2);
			$scope.ranks = rankMoviesArr;
			console.log("rank movies in vote1", rankMoviesArr);
			removeMovie(movie1);
			removeMovie(movie2);
			pickRandomMovies();
			console.log("what??? 1");

		};

		$scope.voteMovie2 = (movie2, movie1) => {
			console.log("vote 2 button");
			movie2.won += 1;
			movie2.totalFights += 1;
			movie2.rank = movie2.won/movie2.totalFights;
			movie1.totalFights += 1;
			console.log($scope.movie1);
			console.log($scope.movie2);
			rankMoviesArr.push(movie2, movie1);
			$scope.ranks = rankMoviesArr;
			console.log("ranked movies in vote2", rankMoviesArr);
			removeMovie(movie1);
			removeMovie(movie2);
			pickRandomMovies();
			console.log("what??? 2");
		};

		// let rankMovies = (rankMoviesArr) => {
		// 	$filter('orderBy')(rankMoviesArr, expression, reverse, rankMoviesArr.rank);
		// 	console.log("rank movies function");
		// };

		// // $filter('orderBy')(collection, expression, reverse, comparator)
		
		let vs = () => {


		};

		$scope.movies = [];
		MovieFactory.getImdb250()
			.then( (data) => {
				let movieListArr = [];
				angular.forEach(data.data, function(value,key) {
					value.rank = 0;
					value.won = 0;
					value.lose = 0;
					value.totalFights = 0;
					movieListArr.push(value);
				});
				$scope.movies = movieListArr;
					// console.log("movie scope", $scope.movies);
				pickRandomMovies();
			});

		// MovieFactory.getPopularMovies1();
		// MovieFactory.getPopularMovies2();
		


		

	

});
