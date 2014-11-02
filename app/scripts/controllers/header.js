/**
 * Created by twitkowski1016 on 23/10/2014.
 */
'use strict';
function HeaderController($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

}