/**
 * Created by Tomasz Witkowski on 13/11/2014.
 */

(function () {
    'use strict';
    angular
        .module('queryStringApp')
        .directive('socialBtns', function () {
            return {
                link: Link
            };

            function Link(scope, element) {
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
        });
})();