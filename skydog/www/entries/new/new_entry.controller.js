'use strict';

angular.module('starter').controller('NewEntryCtrl', function($scope, $localstorage, $state){

  $scope.weapons = ['Walther GSP .22', 'Pardini .22', 'Revolver .22', 'Riffel .22'];

  $scope.entry = {
    id: null,
    weapon: null,
    date: null,
    outdoors: false,
    distance: 15,
    shots: 50,
    score: null
  };

  $scope.saveEntry = function(){
    $scope.entry.id = $localstorage.getNextId();
    $localstorage.appendObject('entries', $scope.entry);
    $state.go('view', {id: $scope.entry.id});
  };

});
