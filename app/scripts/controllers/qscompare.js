'use strict';

/**
 * @ngdoc function
 * @name queryStringApp.controller:QsCompareCtrl
 * @description
 * # QsCompareCtrl
 * Controller of the queryStringApp
 */
angular.module('queryStringApp')
    .controller('QsCompareCtrl', ['$scope', 'aService', function ($scope, aServiece) {
        this.links = aServiece.links;
        this.addLink = function (link) {
            this.links.push(link);
            this.compareLinks();
        };
        this.keys = [];

        this.compareLinks = function () {
            var allKeys = {}, that = this;

            this.links.forEach(function (link) {
                Object.keys(link.queryString).map(function (key) {
                    allKeys[key] = {same: false, data: []};
                });
            });
            this.keys = allKeys;
            Object.keys(this.keys).forEach(function (k) {
                that.links.forEach(function (l, linkIndex) {
                    if (typeof(l.queryString[k]) !== 'undefined') {
                        that.keys[k].data[linkIndex] = l.queryString[k];
                    } else {
                        that.keys[k].data[linkIndex] = '-';
                    }
                });
                that.keys[k].same = !that.keys[k].data.some(function (element, index, array) {
                    return element !== array[0];
                });
                that.keys[k].warn = !!that.keys[k].data.some(function (element) {
                    return element === '-[warn]-';
                });
            });
            console.log(this.keys);
        };
        this.removeLink = function (link) {
            this.links = this.links.filter(function (e) {
                return e !== link;
            });
            this.compareLinks();
        };

    }]);


