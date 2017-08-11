'use strict';

movieApp.controller("MovieController", function($filter, $scope, $window, MovieFactory, UserFactory) {
		
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
				top20 = rankMoviesArr.slice(0, rankMoviesArr.length);
				top20 = _.uniqBy(top20, "original_title");
				console.log("after slice", top20);
				$scope.top = top20;
			} else {
				top20 =[];
				top20 = rankMoviesArr.slice(0,20);
				top20 = _.uniqBy(top20, "original_title");
				console.log("makeTop20 function", rankMoviesArr);
				$scope.top = top20;
			}

		};
		

		//array = _.uniqBy(array, "name");
		let pickRandomMovies = () => {
			let movie1;
			let movie2;
			do {
				movie1 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
				movie2 = $scope.movies[Math.floor(Math.random()*$scope.movies.length)];
			}
			while (movie1 === movie2);
			rankMoviesArr.push(movie1, movie2);
			$scope.movie1 = movie1;
			$scope.movie2 = movie2;
		};

		let pickRankedMovies = () => {
			rankMoviesArr = _.uniqBy( rankMoviesArr, "original_title");
			let movieA;
			let movieB;
			do {
				movieA = rankMoviesArr[Math.floor(Math.random()*rankMoviesArr.length)];
				movieB = rankMoviesArr[Math.floor(Math.random()*rankMoviesArr.length)];
			}
			while (movieA === movieB);
			$scope.movie1 = movieA;
			$scope.movie2 = movieB;
		};

		let pickTop20 = () => {
			let movieAlpha;
			let movieBravo;
			top20 = _.uniqBy( top20, "original_title");
			console.log("top 20", top20);
			do {
				movieAlpha = top20[Math.floor(Math.random()*top20.length)];
				movieBravo = top20[Math.floor(Math.random()*top20.length)];
			}
			while (movieAlpha === movieBravo);
			$scope.movie1 = movieAlpha;
			$scope.movie2 = movieBravo;
		};

		//need to fix incase there is no more movies in generic movie list
		let decider = () => {
			if (counter === 0) {
				console.log("1");
				pickRandomMovies();
				counter += 1;
			} else if (counter % 2 === 0) {
				console.log("2");
				pickTop20();
				
				counter += 1;
			} else if (counter % 3 === 0) {
				console.log("3");
				pickRankedMovies();
				counter += 1;
			} else {
				console.log("4");
				pickRandomMovies();
				counter += 1;
			}
		};

		$scope.voteMovie1 = (movie1, movie2) => {
			movie1 = $scope.movie1;
			movie2 = $scope.movie2;

			if (movie1.rank === movie2.rank) {
				movie1.rank += 100;
				movie1.totalFights += 1;
				movie2.rank -= 50;
			} else if (movie1.rank < movie2.rank) {
				movie1.rank += 200;
				movie1.totalFights += 1;
				movie2.rank -= 100;
			} else if (movie1.rank > movie2.rank) {
				movie1.rank += 50;
				movie1.totalFights += 1;
				movie2.rank -= 50;
			}
			
			rankMoviesArr = _.uniqBy(rankMoviesArr, "original_title");
			

			sortByrank(rankMoviesArr);
			// sortByWon(rankMoviesArr);
			makeTop20(rankMoviesArr, top20);
			console.log('top', top20);
			
			removeMovie(movie1);
			removeMovie(movie2);
			
			decider();

		};

		$scope.voteMovie2 = (movie2, movie1) => {
			movie2 = $scope.movie2;
			movie1 = $scope.movie1;

			if (movie2.rank === movie1.rank) {
				movie2.rank += 100;
				movie2.totalFights += 1;
				movie1.rank -= 50; 
			} else if (movie2.rank < movie1.rank) {
				movie2.rank += 200;
				movie2.totalFights += 1;
				movie1.rank -= 100;
			} else if (movie2.rank > movie1.rank) {
				movie2.rank += 50;
				movie2.totalFights += 1;
				movie1.rank -= 50;
			}
	
			sortByrank(rankMoviesArr);
			// sortByWon(rankMoviesArr);
			makeTop20(rankMoviesArr, top20);

			console.log('top', top20);


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
					if (value.hasOwnProperty('poster_path')!==true) {
						value.poster_path = '../img/no-poster.jpg';
					} else {
						value.poster_path = `https://image.tmdb.org/t/p/w342` + value.poster_path;
					}
					value.release_date = value.release_date.split("-");
					value.release_date = value.release_date[0];
					value.rank = 1000;
					value.won = 0;
					value.lose = 0;
					value.totalFights = 0;
					movieListArr.push(value);
					movieListArr = _.uniqBy( movieListArr, "original_title");
				});
				$scope.movies = movieListArr;
				console.log('movies', $scope.movies);
				pickRandomMovies();
			});

		// MovieFactory.getPopularMovies1();
		// MovieFactory.getPopularMovies2();

});
