'use strict';

movieApp.factory("MovieFactory", function($q, $http, FirebaseUrl, UserFactory) {

	let getImdb250 = () => {
		return $q( (resolve, reject) => {
			$http.get(`${FirebaseUrl}/movieList.json`)
			.then( (movieList) => {
				resolve(movieList);
			})
			.catch( (err) => {
				console.log("IMDB 250 error");
				reject(err);
			});
		});
	};
});