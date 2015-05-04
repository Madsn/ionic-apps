'use strict';

angular.module('starter').controller('NewEntryCtrl', function($scope, $localstorage){

  $scope.weapons = ['Walther GSP .22', 'Pardini .22', 'Revolver .22', 'Riffel .22'];

  $scope.entry = {
    weapon: null,
    date: null,
    outdoors: false,
    distance: 15,
    shots: 50,
    score: null
  };

  $scope.saveEntry = function(){
    $localstorage.appendObject('entries', $scope.entry);
  };

});
