/**
 * Created by twitkowski1016 on 23/10/2014.
 */
'use strict';

angular.module('queryStringApp')
    .controller('LinkController', ['$scope', 'aService',function ($scope,aServiece) {
    var _qsSeparator = '?', _variableSeparator = '&', _valueSeparator = '=';
    Object.defineProperty(this, 'qsSeparator', {
        get: function () {
            return _qsSeparator;
        },
        set: function (newVal) {
            _qsSeparator = newVal;
        }
    });

    Object.defineProperty(this, 'variableSeparator', {
        get: function () {
            return _variableSeparator;
        },
        set: function (newVal) {
            _variableSeparator = newVal;
        }
    });

    Object.defineProperty(this, 'valueSeparator', {
        get: function () {
            return _valueSeparator;
        },
        set: function (newVal) {
            _valueSeparator = newVal;
        }
    });

    this.parseHash = true;

    this.processLink = function (link) {
        var processed = {},
            hashPos,

            splitVars = function (qs) {
            return qs.split(_variableSeparator).map(function (pair) {
                var spair = pair.split(_valueSeparator);
                if(spair.length>2){
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

        this.valueSeparator = link.valueSeparator  || this.valueSeparator;
        this.variableSeparator = link.variableSeparator  || this.variableSeparator;
        this.qsSeparator = link.qsSeparator || this.qsSeparator;
        this.parseHash = (typeof(link.parseHash)!=='undefined')?link.parseHash:true;

        if(this.parseHash && ((hashPos = link.url.indexOf('#'))!==-1)){
            processed.hash = processed.url.substr(hashPos+1);
            processed.url = processed.url.substring(0,hashPos);
        }

        if (processed.url.indexOf(this.qsSeparator) === -1) {
            //eg www.example.com or a=1&b=2
            if (processed.url.indexOf(this.variableSeparator) === -1) {
                //www.example.com
                if (processed.url.indexOf(this.valueSeparator) !== -1) {
                    processed.queryString = splitVars(processed.url);
                } else {
                    processed.host = processed.url;

                }
            } else {
                //a=1&b=2
                processed.queryString = splitVars(processed.url);
            }
        } else {
            var urlParts = processed.url.split(this.qsSeparator);
            processed.queryString = splitVars(urlParts[1]);
            processed.host = urlParts[0] || processed.host;
        }
//console.log(processed);
        return processed;

    };

    this.link = {url:'',valueSeparator:'=',variableSeparator:'&', qsSeparator:'?',parseHash:true};


    this.addLink = function (qscompare) {
        this.link = this.processLink(this.link);
        qscompare.addLink(this.link);
        this.link = {url:'',valueSeparator:'=',variableSeparator:'&', qsSeparator:'?',parseHash:true};
    };
}]);