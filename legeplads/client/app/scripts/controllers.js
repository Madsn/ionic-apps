'use strict';

angular.module('starter')

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope, Playlist) {
  $scope.playlists = Playlist.find();
})
.controller('PlaylistCtrl', function($scope, Song) {
  $scope.songs = Song.find();
})
.controller('MapCtrl', function($scope, uiGmapGoogleMapApi) {
  uiGmapGoogleMapApi.then(function() {

    $scope.markers = [];

    var addMarker = function(marker, eventName, args){
      var e = args[0];
      var lat = e.latLng.lat(),
          lon = e.latLng.lng();

      $scope.$apply(function(){
        $scope.markers.push({
          id: Math.random() * 100000,
          latitude: lat,
          longitude: lon,
          showWindow: true,
          title: 'Marker 0',
          click: function(){
            console.log('marker clicked, lat: ' + lat + ' lon: ' + lon);
          }
        });
      });
    };

    $scope.map = {
      center: {latitude: 40.1451, longitude: -99.6680 },
      zoom: 4,
      bounds: {},
      control: {},
      options: {scrollwheel: true},
      events: {
        click: addMarker
      }
    };

  });

});
