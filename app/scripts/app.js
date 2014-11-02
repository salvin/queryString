'use strict';

/**
 * @ngdoc overview
 * @name queryStringApp
 * @description
 * # queryStringApp
 *
 * Main module of the application.
 */
var qsapp = angular
    .module('queryStringApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        /*'qsLink'*/
    ])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/compare.html',
                controller: 'QsCompareCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
qsapp.factory('aService', function ($rootScope) {
    var scope = $rootScope.$new(true);
    scope.links = [];
    return scope;
});
qsapp.directive('socialBtns', function() {
    return {
        link: function(scope, element) {
            jQuery(element).stoopidSocial({
                networks: ['facebook', 'twitter', 'pintrest', 'google', 'linkedin'],
                shareData: {
                    title: 'Analyze and compare urls in an easy, readable form.',
                    copy: 'Query String Comparator lets you analyze, compare urls, query strings, hash values by creating a readable table.',
                    image: 'http://www.querystring.info/images/QueryStringComparer.png',
                    url: 'http://www.querystring.info'
                },
                facebookSDK: true,
                facebookAppID: '1530588703865393',
                twitterSDK: true,
                injectStyles: true
            });
        }
    };
});