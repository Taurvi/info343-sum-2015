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
    });

    // Name variables
    var firstName = currentUser.get('firstName');
    var lastName = currentUser.get('lastName');
    // Shows First + Last Name on page
    $('.user-name').text(firstName + ' ' + lastName);

    // Capital letter acts as "Constructor" for new creation

    // Shows up in Admin UI as new class, defined
    var Task = Parse.Object.extend('Task');

    // Query just for current user
    var tasksQuery = new Parse.Query(Task);
    // Filters query
    tasksQuery.equalTo('user', currentUser);
    // Sorting order -- One string, comma separated list
    tasksQuery.ascending('done, created at');

    // Creates new collection that contains tasks which have queries
    var TaskList = Parse.Collection.extend({
        model: Task,
        query: tasksQuery,
        // if returns true, tasks will be part of filter operation,
        // else not (returns all tasks marked completed)
        getCompleted: function() {
            return this.filter(function(task) {
               return task.get('done');
            });
        }
    });

    // Create new instance of TaskList
    var tasks = new TaskList();

    // Catches all events -- 'all' is a special
    tasks.on('all', function() {
        // clear ul element with spinner, add li for all tasks

        // variable for task list element
        var taskList = $('.task-list');

        // Empties all child elements
        taskList.empty();

        // Iterate over all tasks inside
        // forEach calls function on each function
        this.forEach(function(task) {
            // Creates DOM element (takes param string of element)
            var taskItem = $(document.createElement('li'));
            // Sets title of li to whatever the task title is
            taskItem.text(task.get('title'));
            // Checks if task is done, and applies CSS
            if (task.get('done')) {
                taskItem.addClass('task-done');
            }
            // Sets done
            taskItem.click(function() {
                // Inverts the property relative to what it is currently
                task.set('done', !task.get('done'));
                // saves to database
                task.save();
            });

            // Adds to ul containing li elements
            taskList.append(taskItem);
        });
        // Show/Hide purge button
        if (this.getCompleted().length > 0) {
            $('.btn-purge').fadeIn(200);
        } else {
            $('.btn-purge').fadeOut(200);
        }
    });

    // Gets all the tasks on the Parse service that are owned by the user
    tasks.fetch();

    // Creates new tasks
    $('.form-new-task').submit(function(evt) {
        evt.preventDefault();

        // this = the form
        var newTaskForm = $(this);

        // searches for input control
        var newTitleInput = newTaskForm.find('.new-task-title');

        // create new parse Task object
        var newTask = new Task();
        // sets task title
        newTask.set('title', newTitleInput.val());
        // sets user to current
        newTask.set('user', currentUser);
        // sets 'done' to false
        newTask.set('done', false);

        // Get variable for button -- :submit will find the submit button within form
        var addButton = newTaskForm.find(':submit');
        // sets property to disabled and adds class 'working'
        addButton.prop('disabled', true).addClass('working');

        // saves into database, returns promise
        newTask.save().then(function() {
            // adds new task that got saved to collection, and collection will show on page
            tasks.add(newTask);
            newTitleInput.val('');

            // Removes spinner button
            addButton.prop('disabled', false).removeClass('working');
        }, function(err) {
            // On failure, display error
            showError(err);

            // Removes spinner button
            addButton.prop('disabled', false).removeClass('working');
        });
    });

    // Grab purge button and handle click event
    $('.btn-purge').click(function() {
       // Deletes all tasks that have been completed
       Parse.Object.destroyAll(tasks.getCompleted());
    });
})