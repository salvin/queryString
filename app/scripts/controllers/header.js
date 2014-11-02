/**
 * Created by twitkowski1016 on 23/10/2014.
 */
'use strict';
angular.module('queryStringApp')
    .controller('HeaderController',['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
