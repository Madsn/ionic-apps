'use strict';

angular.module('starter').controller('ListEntriesCtrl', function($scope, $localstorage){

  $scope.entries = $localstorage.getObject('entries');

});
