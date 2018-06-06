'use strict';

// some configuration
// ----------------------------------------------------------------------

var gitHubRepos = 'https://api.github.com/search/repositories?q=';
var SaveBookmarkUrl = '/Crud/SaveBookmark';
var GetBookmarksUrl = '/Crud/GetBookmarks';

// angularjs core - routing, state, etc
// ----------------------------------------------------------------------

var app = angular.module("IsracardApp", ['ngRoute', 'ngSanitize', 'ui.router']);
app.config(function ($routeProvider, $locationProvider, $stateProvider) {

    $routeProvider.when('/github/search', {
        templateUrl: '/Templates/Search.html',
        controller: 'SearchController'
    })
    .when('/github/bookmarks', {
        templateUrl: '/Templates/Bookmarks.html',
        controller: 'BookmarksController'
    })
    .otherwise({ redirectTo: '/github/search' });

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('Search', { url: '/github/search', templateUrl: '/Templates/Search.html', controller: 'SearchController' })
        .state('Bookmarks', { url: '/github/bookmarks', templateUrl: '/Templates/Bookmarks.html', controller: 'BookmarksController' });
});
