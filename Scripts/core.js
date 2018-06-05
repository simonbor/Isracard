
var gitHubRepos = 'https://api.github.com/search/repositories?q=';
var saveRepoUrl = '/Github/Save';

(function () {

    var app = angular.module("IsracardApp", ['ngSanitize']);

    var searchController = function ($scope, $http) {

        var onError = function (reason) {
            $scope.error = reason.statusText + ' - ' + reason.status;
            console.log($scope.new_body);
        };

        var fillResult = function (response) {
            if (response && response.data && response.data.items) {
                angular.forEach(response.data.items, function(rep) {
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
                })
                .then(fillResult, onError);
        }

        $scope.getReposOnEnter = function(keyEvent) {
            (keyEvent.which === 13) && $scope.getRepos();
        }

        $scope.saveRepo = function (repoId) {
            $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: { playload: JSON.stringify($scope.repos[repoId]) },
                url: '/Github/Save'
            }).then(function (res) {
                console.log('the ' + res.data + ' saved');
            }, onError);
        }

        $scope.caption = 'Github Search';
        $scope.keyword = '';
        $scope.repos = {};

        $scope.getRepos();
    };

    app.controller("searchController", searchController);
})();
