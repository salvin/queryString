'use strict';

describe('LinkController', function () {

    // load the controller's module
    beforeEach(module('queryStringApp'));

    var LinkCtrl,
        scope;
    describe('processLink', function () {
        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            LinkCtrl = $controller('LinkController', {
                $scope: scope
            });
        }));

        describe('query string', function () {


            it('www.example.com', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com'}).queryString).toEqual({});
            });
            it('www.example.com?', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?'}).queryString['-[empty]-']).toBeDefined();
            });
            it('www.example.com?', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?'}).queryString['-[empty]-']).toBe('');
            });
            it('www.example.com?a=1', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?a=1'}).queryString.a).toBe('1');
            });
            it('www.example.com?a', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?a'}).queryString.a).toBeDefined();
            });
            it('www.example.com?a', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?a'}).queryString.a).toBe('');
            });
            it('www.example.com?a=1&', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?a=1&'}).queryString.a).toBe('1');
            });
            it('www.example.com?a=1&fdsaklfjas=2', function () {
                expect(LinkCtrl.processLink({url: 'www.example.com?a=1&fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
            });
            it('?a=1&fdsaklfjas=2', function () {
                expect(LinkCtrl.processLink({url: '?a=1&fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
            });
            it('a=1&fdsaklfjas=2', function () {
                expect(LinkCtrl.processLink({url: 'a=1&fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
            });
            it('a=1&fdsaklfjas=2&&', function () {
                expect(LinkCtrl.processLink({url: 'a=1&fdsaklfjas=2&&'}).queryString['-[empty]-']).toBeDefined();
            });


            it('a=', function () {
                expect(LinkCtrl.processLink({url: 'a='}).queryString.a).toBeDefined();
                expect(LinkCtrl.processLink({url: 'a='}).queryString.a).toBe('');
            });
            it('a=&b=', function () {
                expect(LinkCtrl.processLink({url: 'a=&b='}).queryString.a).toBeDefined();
                expect(LinkCtrl.processLink({url: 'a=&b='}).queryString.a).toBe('');
                expect(LinkCtrl.processLink({url: 'a=&b='}).queryString.b).toBeDefined();
                expect(LinkCtrl.processLink({url: 'a=&b='}).queryString.b).toBe('');
            });

            it('?a=', function () {
                expect(LinkCtrl.processLink({url: '?a='}).queryString.a).toBeDefined();
                expect(LinkCtrl.processLink({url: '?a='}).queryString.a).toBe('');
            });

            it('?=', function () {
                expect(LinkCtrl.processLink({url: '?='}).queryString['-[empty]-']).toBeDefined();
            });
            it('&=', function () {
                expect(LinkCtrl.processLink({url: '&='}).queryString['-[empty]-']).toBeDefined();
            });
            describe('; separator', function () {
                beforeEach(function () {
                    LinkCtrl.variableSeparator = ';';
                });
                it('www.example.com?a', function () {
                    expect(LinkCtrl.processLink({url: 'www.example.com?a'}).queryString.a).toBe('');
                });
                it('www.example.com?a=1;', function () {
                    expect(LinkCtrl.processLink({url: 'www.example.com?a=1;'}).queryString.a).toBe('1');
                });
                it('www.example.com?a=1;fdsaklfjas=2', function () {
                    expect(LinkCtrl.processLink({url: 'www.example.com?a=1;fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
                });
                it('?a=1;fdsaklfjas=2', function () {
                    expect(LinkCtrl.processLink({url: '?a=1;fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
                });
                it('a=1;fdsaklfjas=2', function () {
                    expect(LinkCtrl.processLink({url: 'a=1;fdsaklfjas=2'}).queryString.fdsaklfjas).toBe('2');
                });
                it('a=1;fdsaklfjas=2;;', function () {
                    expect(LinkCtrl.processLink({url: 'a=1;fdsaklfjas=2;;'}).queryString['-[empty]-']).toBeDefined();
                });
            });
        });
        describe('hash', function () {
            it('should be processed', function () {
                //console.log(LinkCtrl.processLink({url: 'https://www.google.com/analytics/web/?hl=en#report/visitors-overview/a28533307w54308777p55234147/'}));
                expect(LinkCtrl.processLink({url: 'https://www.google.com/analytics/web/?hl=en#report/visitors-overview/a28533307w54308777p55234147/'}).hash).toBeDefined();
                expect(LinkCtrl.processLink({url: 'https://www.google.com/analytics/web/?hl=en#report/visitors-overview/a28533307w54308777p55234147/'}).hash).toBe('report/visitors-overview/a28533307w54308777p55234147/');
            });
        });

        describe('parse Error', function () {
            it('should use entry as index', function () {
                expect(LinkCtrl.processLink({url: 'www.google.com/analytics/web/?hl=en=6'}).queryString['hl=en=6']).toBeDefined();
                expect(LinkCtrl.processLink({url: 'www.google.com/analytics/web/?hl=en=6'}).queryString.hl).not.toBeDefined();
            });
        });

        describe('parse http://www.google.com/trends/explore#q=url%20variables', function () {
            it('should use entry as index', function () {
                expect(LinkCtrl.processLink({url: 'http://www.google.com/trends/explore#q=url%20variables',parseHash:false, qsSeparator:'#'}).queryString.q).toBeDefined();
                expect(LinkCtrl.processLink({url: 'http://www.google.com/trends/explore#q=url%20variables',parseHash:false, qsSeparator:'#'}).queryString.q).toBe('url%20variables');
            });
        });
    });
});
