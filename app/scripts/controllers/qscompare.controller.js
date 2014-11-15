'use strict';

/**
 * @ngdoc function
 * @name queryStringApp.controller:QsCompareController
 * @description
 * # QsCompareController
 * Controller of the queryStringApp
 */
angular.module('queryStringApp')
    .controller('QsCompareController', ['$scope', 'aService', function ($scope, aServiece) {
        /* jshint validthis: true */
        var vm = this;

        vm.links = aServiece.links;
        vm.addLink = function (link) {
            vm.links.push(link);
            vm.compareLinks();
        };
        vm.keys = [];

        vm.compareLinks = function () {
            var allKeys = {};

            vm.links.forEach(function (link) {
                Object.keys(link.queryString).map(function (key) {
                    allKeys[key] = {same: false, data: []};
                });
            });
            vm.keys = allKeys;
            Object.keys(vm.keys).forEach(function (k) {
                vm.links.forEach(function (l, linkIndex) {
                    if (typeof(l.queryString[k]) !== 'undefined') {
                        vm.keys[k].data[linkIndex] = l.queryString[k];
                    } else {
                        vm.keys[k].data[linkIndex] = '-';
                    }
                });
                vm.keys[k].same = !vm.keys[k].data.some(function (element, index, array) {
                    return element !== array[0];
                });
                vm.keys[k].warn = !!vm.keys[k].data.some(function (element) {
                    return element === '-[warn]-';
                });
            });
            console.log(vm.keys);
        };
        vm.removeLink = function (link) {
            vm.links = vm.links.filter(function (e) {
                return e !== link;
            });
            vm.compareLinks();
        };

    }]);


