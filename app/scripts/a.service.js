/**
 * Created by Tomasz Witkowski on 13/11/2014.
 */
(function () {
    'use strict';
    angular
        .module('queryStringApp')
        .factory('aService', aService);

    function aService($rootScope) {
        console.log('aService init');

        var scope = $rootScope.$new(true);
        scope.links = [];
        return scope;
    }
})();