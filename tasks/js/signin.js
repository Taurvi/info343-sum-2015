"use strict";

/*
    signin.js
    Script for the signin.html page
    Handle the form submit and use Parse.User.logIn() to start an authenticated session
*/

//use jQuery to register a function that is called when the document is ready for manipulation
$(function() {
    $('.form-signin').submit(function(evt) {

        evt.preventDefault();

        // Variables
        var email = $('#inputEmail');
        var password = $('#inputPassword');

        // Login function, returns a promise
        Parse.User.logIn(email, password).then(function() {
            // Redirect on success
            window.location = 'index.html';
        }, function(err){
            // Display error on fail
            showError(err);
        });
    })
})