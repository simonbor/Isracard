var gitHubRepos = 'https://api.github.com/search/repositories?q=';

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

        $scope.saveRepo = function(repoId) {
            console.log('the ' + $scope.repos[repoId].full_name + ' saved');
        }

        $scope.caption = 'Github Search';
        $scope.keyword = '';
        $scope.repos = {};

        $scope.getRepos();
    };

    app.controller("searchController", searchController);
})();
