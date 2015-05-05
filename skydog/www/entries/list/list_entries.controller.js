'use strict';

angular.module('starter').controller('ListEntriesCtrl', function($scope, $state, $localstorage){

  $scope.entries = $localstorage.getObject('entries');

  $scope.openEntry = function(id){
    $state.go('view', {id: id});
  };
});
