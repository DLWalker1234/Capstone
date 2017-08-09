'use strict';

movieApp.controller("MovieController", function($filter, $scope, $window, MovieFactory, UserFactory) {
		let boy = {name: "bob", age: 12};
		let array = [{name: "bob", age: 12},{name: "sam", age: 10},{name: "bob", age: 9},{name: "henry", age: 5},{name: "luke", age: 7},{name: "sam", age: 10}];
		console.log("before", array);
		array = _.uniqBy(array, "name");



		console.log('array?', array);

		let counter = 0;

		let top20 = [];
		let rankMoviesArr = [];

		let removeMovie = (movie) => {
			let removeMovie = $scope.movies.indexOf(movie);
			$scope.movies.splice(movie, 1);
			console.log("removie", removeMovie);
		};

		let sortByrank = (rankMoviesArr) => {
			rankMoviesArr.sort(function(a, b) {
            	return b.rank - a.rank;
        	});
        	
		};

		let sortByWon = (rankMoviesArr) => {
			rankMoviesArr.sort(function(a, b) {
				return b.won - a.won;
			});
		};

		let makeTop20 = () => {
			if (rankMoviesArr.length < 20) {
				top20 = [];
				console.log("should be empty", top20);
				top20 = _.uniqBy(top20, "original_title");
				console.log("before slice", top20);
				top20 = rankMoviesArr.slice(0, rankMoviesArr.length);
				console.log("after slice", top20);
				$scope.top = top20;
			} else {
				top20 =[];
				top20 = _.uniqBy(top20, "original_title");
				top20 = rankMoviesArr.slice(0,20);
				console.log("makeTop20 function", rankMoviesArr);
				$scope.top = top20;
			}

		};
		

		//array = _.uniqBy(array, "name");
		let pickRandomMovies = () => {
			let movie1 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
			let movie2 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
			$scope.movie1 = movie1;
			$scope.movie2 = movie2;
		};

		let pickRankedMovies = () => {
			rankMoviesArr = _.uniqBy( rankMoviesArr, "original_title");
			let movieA = rankMoviesArr[Math.floor(Math.random()*rankMoviesArr.length)];
			let movieB = rankMoviesArr[Math.floor(Math.random()*rankMoviesArr.length)];
			$scope.movieA = movieA;
			$scope.movieB = movieB;
		};

		let pickTop20 = () => {
			top20 = _.uniqBy( top20, "original_title");
			console.log("top 20", top20);
			let movieAlpha = top20[Math.floor(Math.random()*top20.length)];
			let movieBravo = top20[Math.floor(Math.random()*top20.length)];
			$scope.movieAlpha = movieAlpha;
			$scope.movieBraco = movieBravo;
		};

		let filter = () => {

		};

		//need to fix incase there is no more movies in generic movie list
		let decider = () => {
			if (counter === 0) {
				console.log("1");
				pickRandomMovies();
				counter += 1;
			} else if (counter % 2 === 0) {
				console.log("2");
				pickRandomMovies();
				counter += 1;
			} else if (counter % 3 === 0) {
				console.log("3");
				pickRankedMovies();
				counter += 1;
			} else {
				console.log("4");
				pickTop20();
				counter += 1;
			}
		};

		$scope.voteMovie1 = (movie1, movie2) => {
			movie1.won += 1;
			movie1.totalFights += 1;
			movie1.rank = movie1.won/movie1.totalFights;
			movie2.totalFights += 1;
			console.log('before push', rankMoviesArr);
			rankMoviesArr.push(movie1, movie2);
			rankMoviesArr = _.uniqBy(rankMoviesArr, "original_title");
			console.log('after push', rankMoviesArr);
			console.log("help", rankMoviesArr);
			

			sortByrank(rankMoviesArr);
			sortByWon(rankMoviesArr);
			makeTop20(rankMoviesArr, top20);

			
			removeMovie(movie1);
			removeMovie(movie2);
			
			decider();

		};

		$scope.voteMovie2 = (movie2, movie1) => {
			movie2.won += 1;
			movie2.totalFights += 1;
			movie2.rank = movie2.won/movie2.totalFights;
			movie1.totalFights += 1;
			
			rankMoviesArr.push(movie2, movie1);

			sortByrank(rankMoviesArr);
			sortByWon(rankMoviesArr);
			makeTop20(rankMoviesArr, top20);


			removeMovie(movie1);
			removeMovie(movie2);

			
			decider();

		};

		// let getRandomMovie = () => {
		// 	let randomNumber = Math.floor(Math.random() * (35000 - 11) + 11);
		// 	console.log("#", randomNumber);
		// 	MovieFactory.randomMovie(randomNumber);
		// };
		
		$scope.movies = [];
		MovieFactory.getImdb250()
			.then( (data) => {
				let movieListArr = [];
				angular.forEach(data.data, function(value,key) {
					// posterApply(value);
					if (value.hasOwnProperty('poster_path')!==true) {
						value.poster_path = '../img/no-poster.jpg';
					} else {
						value.poster_path = `https://image.tmdb.org/t/p/w342` + value.poster_path;
					}
					value.release_date = value.release_date.split("-");
					value.release_date = value.release_date[0];
					value.rank = 0;
					value.won = 0;
					value.lose = 0;
					value.totalFights = 0;
					movieListArr.push(value);
					movieListArr = _.uniqBy( movieListArr, "original_title");
				});
				$scope.movies = movieListArr;
				pickRandomMovies();
			});

		// MovieFactory.getPopularMovies1();
		// MovieFactory.getPopularMovies2();

});
