'use strict';

app.controller("BookmarksController", function ($scope, $http) {
    var onError = function (reason) {
        $scope.lastError = reason.statusText + ' - ' + reason.status;
        console.log($scope.lastError);
    };

    var fillResult = function (response) {
        if (response && response.data) {
            angular.forEach(response.data, function (rep) {
                rep = JSON.parse(rep);
                this[rep.id] = rep;
            }, $scope.repos);
        }
    };

    $scope.getRepos = function () {
        $scope.repos = {};

        $http({
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url: GetBookmarksUrl
        }).then(fillResult, onError);
    }

    $scope.getRepos();
});
