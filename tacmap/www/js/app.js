// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('MainCtrl', function($scope){
  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {},
                polygons: [], draw: undefined, options: {disableDefaultUI: true},
                events: {}};

  $scope.debugPrint = function() {
    console.log($scope.map.polygons);
    console.log($scope.map.draw);
  };
});
