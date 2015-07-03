"use strict";

/*
    tasks.js
    Script for the index.html page
    This code will use Parse.com's JavaScript library to create new tasks, save them, query them
    mark them as done, and purge done tasks
 */

//use jQuery to register a function that is called when the document is ready for manipulation
$(function () {
    // Checks if user is logged in
    var currentUser = Parse.User.current();
    // Redirect to signin if not logged in
    if (!currentUser) {
        window.location = 'signin.html';
    }

    // Catches SignOut button press
    $('.nav-link-sign-out').click(function(evt) {
        evt.preventDefault()
        // Destroys current session and logout
        Parse.User.logOut();
        //Redirect
        window.location = 'signin.html';
    })
})