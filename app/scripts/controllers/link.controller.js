/**
 * Created by twitkowski1016 on 23/10/2014.
 */
'use strict';

angular.module('queryStringApp')
    .controller('LinkController', ['$scope', 'aService', LinkController]);


function LinkController($scope, aServiece) {
    /* jshint validthis: true */
    var vm = this;

    vm.link = {url: '', valueSeparator: '=', variableSeparator: '&', qsSeparator: '?', parseHash: true};
    vm.parseHash = true;
    vm.qsSeparator = '?';
    vm.variableSeparator = '&';
    vm.valueSeparator = '=';

    vm.processLink = processLink;

    vm.addLink = addLink;

    function addLink(qscompare) {
        vm.link = vm.processLink(vm.link);
        qscompare.addLink(vm.link);
        vm.link = {url: '', valueSeparator: '=', variableSeparator: '&', qsSeparator: '?', parseHash: true};
    }

    function processLink(link) {
        var processed = {},
            hashPos,
            splitVars = function (qs) {
                return qs.split(vm.variableSeparator).map(function (pair) {
                    var spair = pair.split(vm.valueSeparator);
                    if (spair.length > 2) {
                        this[pair] = '-[warn]-';
                        return this;
                    }
                    spair[0] = spair[0] || '-[empty]-';
                    spair[1] = spair[1] || '';
                    this[spair[0]] = spair[1];
                    return this;
                }.bind({}))[0];
            };

        processed.url = link.url;
        processed.originalUrl = link.url;
        processed.host = 'unknown';
        processed.queryString = {};
        processed.hash = '';

        vm.valueSeparator = link.valueSeparator || vm.valueSeparator;
        vm.variableSeparator = link.variableSeparator || vm.variableSeparator;
        vm.qsSeparator = link.qsSeparator || vm.qsSeparator;
        vm.parseHash = (typeof(link.parseHash) !== 'undefined') ? link.parseHash : true;

        if (vm.parseHash && ((hashPos = link.url.indexOf('#')) !== -1)) {
            processed.hash = processed.url.substr(hashPos + 1);
            processed.url = processed.url.substring(0, hashPos);
        }

        if (processed.url.indexOf(vm.qsSeparator) === -1) {
            //eg www.example.com or a=1&b=2
            if (processed.url.indexOf(vm.variableSeparator) === -1) {
                //www.example.com
                if (processed.url.indexOf(vm.valueSeparator) !== -1) {
                    processed.queryString = splitVars(processed.url);
                } else {
                    processed.host = processed.url;
                }
            } else {
                //a=1&b=2
                processed.queryString = splitVars(processed.url);
            }
        } else {
            var urlParts = processed.url.split(vm.qsSeparator);
            processed.queryString = splitVars(urlParts[1]);
            processed.host = urlParts[0] || processed.host;
        }
        return processed;
    }
}