"use strict";

//initialize Parse library with your application ID and your app's JavaScript library key
Parse.initialize('JAiPByaK2UYyGq8Xrdv9wP1J8JdCrFJoe97TZshp', 'WR3LhPzLimJKYNzLoqHzKM8CKaKG9udnuqUTgE0w');

/**
 * Shows an error in an element on the page with the class 'error-message'
 * @param err {Object} the error to be shown
 */
function showError(err) {
    $('.error-message').html(err.message).fadeIn();
}

/**
 * Clears any currently showing error
 */
function clearError() {
    $('.error-message').fadeOut().empty();
}
