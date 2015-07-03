"use strict";

/*
    signup.js
    Script for the signup.html page
    Handle the form submit and create a new Parse.User() for the new user account
 */

//use jQuery to register a function that is called when the document is ready for manipulation
$(function () {
    // Passes event object
    $('.form-signup').submit( function(evt) {
        // Prevents browser from handling event and lets us handle it
        evt.preventDefault();

        // Parse: Create new user
        var user = new Parse.User();

        // Gets variables from form
        var firstName = $('#inputFName').val();
        var lastName = $('#inputLName').val();
        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();

        // Sets parse user parameters
        user.set('username', email);
        user.set('password', password);
        user.set('firstName', firstName);
        user.set('lastName', lastName);

        // Registers user within application
        //user.signUp()

        // Code after immediately before the server replies. Needs promises

        // then() takes two parameters: success and fail
        user.signUp().then(function() {
            // Clears error
            clearError();
            // Takes user to mainpage if sign in successful
            window.location = 'index.html';

        }, function(err) {
            // Takes param 'err' that can be displayed.
            showError(err);
        })

    })

})