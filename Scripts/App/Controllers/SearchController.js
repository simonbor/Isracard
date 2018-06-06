'use strict';

app.controller("SearchController", function ($scope, $http) {

    var onError = function (reason) {
        $scope.lastError = reason.statusText + ' - ' + reason.status;
        console.log($scope.lastError);
    };

    var fillResult = function (response) {
        if (response && response.data && response.data.items) {
            angular.forEach(response.data.items, function (rep) {
                this[rep.id] = rep;
            }, $scope.repos);
        }
    };

    $scope.getRepos = function () {
        var keyword = $scope.keyword;
        $scope.repos = {};

        if (!keyword)
            return;

        $http({
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            url: gitHubRepos + keyword
        }).then(fillResult, onError);
    }

    $scope.getReposOnEnter = function (keyEvent) {
        (keyEvent.which === 13) && $scope.getRepos();
    }

    $scope.saveRepo = function (repoId) {
        $http({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: { payload: JSON.stringify($scope.repos[repoId]) },
            url: SaveBookmarkUrl
        }).then(function (res) {
            console.log('repo ' + res.data + ' bookmarked');
        }, onError);
    }

    $scope.keyword = '';
    $scope.repos = {};
    $scope.getRepos();
});
