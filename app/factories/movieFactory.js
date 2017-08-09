'use strict';

movieApp.factory("MovieFactory", function($q, $http, FirebaseUrl, UserFactory, apiGet) {

	let getImdb250 = () => {
		
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/movieList.json`)
			.then( (data) => {
				resolve(data);
			})
			.catch( (err) => {
				console.log("IMDB 250 error");
				reject(err);
			});
		});
	};

	let addMovie = (movieObj) => {
		return $q( (resolve, reject) => {
			$http.post(`${FirebaseUrl}/movieList.json`)
			.then( (movieObj) => {
				resolve(movieObj);
			})
			.catch( (err) => {
				console.log("add movie error");
				reject();
			});
		});
	};

	let searchMovies = () => {
		return $q( (resolve, reject) => {
			$http.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiGet.key}&query=${apiGet.input}"`)
			.then( (movieObj) => {
				console.log("movie search", movieObj);
				resolve(movieObj);
			})
			.catch( (err) => {
				console.log("search movie error");
				reject();
			});
		});
	};

	let getPopularMovies1 = () => {
		return $q( (resolve, reject) => {
			$http.get(`http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8d52d1b4aba118972c33b3a3aba1eae&page=1`)
			.then( (movieObj) => {
				console.log("pop movies 1", movieObj);
				resolve(movieObj);
			})
			.catch( (err) => {
				console.log("pop movie 1 error");
				reject();
			});
		});
	};

	let getPopularMovies2 = () => {
		return $q( (resolve, reject) => {
			$http.get(`http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8d52d1b4aba118972c33b3a3aba1eae&page=2`)
			.then( (movieObj) => {
				console.log("pop movies 2", movieObj);
				resolve(movieObj);
			})
			.catch( (err) => {
				console.log( "pop movie 2 error");
				reject();
			});
		});
	};

	let randomMovie = (randomNumber) => {
		return $q( (resolve, reject) => {
			$http.get(`http://api.themoviedb.org/3/movie/{randomNumber}?api_key=c8d52d1b4aba118972c33b3a3aba1eae`)
			.then( (movieObj) => {
				console.log("random?", movieObj);
				resolve(movieObj);
			})
			.catch( (err) => {
				console.log("genre error");
				reject();
			});
		});
	};
	return { getImdb250, addMovie, searchMovies, getPopularMovies1, getPopularMovies2, randomMovie};
});