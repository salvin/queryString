/**
 * Created by Tomasz Witkowski on 13/11/2014.
 */
(function () {
    'use strict';
    angular
        .module('queryStringApp')
        .config(['$routeProvider', Router]);

    function Router($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/compare.html',
                controller: 'QsCompareController',
                controllerAs: 'compCtrl'
            })
            .when('/:compareResult', {
                templateUrl: 'views/compare.html',
                controller: 'QsCompareController',
                controllerAs: 'compCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();
