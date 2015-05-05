'use strict';

angular.module('starter').controller('ViewEntryCtrl', function($scope, $localstorage, $stateParams){

  $scope.entry = $localstorage.getEntryById($stateParams.id);

});
