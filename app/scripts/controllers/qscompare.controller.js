'use strict';

/**
 * @ngdoc function
 * @name queryStringApp.controller:QsCompareController
 * @description
 * # QsCompareController
 * Controller of the queryStringApp
 */
angular.module('queryStringApp')
    .controller('QsCompareController', ['$scope', 'aService', 'base64Service', '$location', '$anchorScroll', function ($scope, aServiece, base64Service, $location, $anchorScroll) {
        /* jshint validthis: true */
        var vm = this;

        vm.addLink = addLink;
        vm.compareLinks = compareLinks;
        vm.keys = [];
        vm.links = aServiece.links;
        vm.linksBase = '';
        vm.removeLink = removeLink;

        activate();


        function addLink(link) {
            vm.links.push(link);
            updateBase();
            vm.compareLinks();
            $location.hash('results');
            $anchorScroll();
        }

        function compareLinks() {
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
        }

        function removeLink(link) {
            vm.links = vm.links.filter(function (e) {
                return e !== link;
            });
            vm.compareLinks();
            updateBase();
        }

        function updateBase() {

            console.log(JSON.stringify(vm.links.map(function (e) {
                return e.originalUrl;
            })));
            console.log(base64Service.encode(JSON.stringify(vm.links.map(function (e) {
                return e.originalUrl;
            }))));
            console.log(base64Service.decode(base64Service.encode(JSON.stringify(vm.links.map(function (e) {
                return e.originalUrl;
            })))));
            console.log(JSON.parse(base64Service.decode(base64Service.encode(JSON.stringify(vm.links.map(function (e) {
                return e.originalUrl;
            }))))));

            vm.linksBase = base64Service.encode(JSON.stringify(vm.links));

            //$location.hash(vm.linksBase);

        }

        function activate() {
            console.log('activate');
            var cmpParam = $location.path(), links;
            cmpParam = cmpParam.substring(1, cmpParam.length);
            if (cmpParam !== ''){
                links = JSON.parse(base64Service.decode(cmpParam));
                console.log(links);
                links.forEach(function(element){
                    vm.addLink(element);
                });
            }
        }

        }
        ]);


