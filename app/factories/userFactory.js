'use strict';

movieApp.factory("UserFactory", function($q, $http, FirebaseUrl, FBCreds) {


    var config = {
        apiKey: FBCreds.key,
        authDomain: "movievs-2dac3.firebaseapp.com",
        databaseURL: "https://movievs-2dac3.firebaseio.com",
        projectId: "movievs-2dac3",
        storageBucket: "movievs-2dac3.appspot.com",
        messagingSenderId: "786686695796"
    };

    firebase.initializeApp(config);


    let currentUser = null;

    let isAuthenticated = function() {
        return new Promise( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if(user) {
                    currentUser = user.uid;
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };


    let getUser = () => {
        return currentUser;
    };

    let createUser = (userObj) => {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch( (err) => {
            console.log("create user error", err.message);
        });
    };

    let loginUser = (userObj) => {
    return $q( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
      .then( (user) => {
        currentUser = user.uid;
        resolve(user);
      })
      .catch( (err) => {
        console.log("error loggin in", err.message);
      });
    });
  };

    let logoutUser = (userObj) => {
        return firebase.auth().signOut()
        .catch( (err) => {
            console.log("log out error", err.message);
        });
    };


    return {isAuthenticated, getUser, createUser, loginUser, logoutUser};
});