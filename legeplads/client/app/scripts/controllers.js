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
  uiGmapGoogleMapApi.then(function(maps) {
    console.log('Lib loaded');
    console.log(maps);

    $scope.drawingManagerOptions = {
      drawingMode: maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            maps.drawing.OverlayType.MARKER,
            maps.drawing.OverlayType.CIRCLE,
            maps.drawing.OverlayType.POLYGON,
            maps.drawing.OverlayType.POLYLINE,
            maps.drawing.OverlayType.RECTANGLE
          ]
      },
      circleOptions: {
        fillColor: '#ffff00',
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1
        }
      };
    $scope.markersAndCircleFlag = true;
    $scope.drawingManagerControl = {};
    $scope.$watch('markersAndCircleFlag', function() {
      if (!$scope.drawingManagerControl.getDrawingManager) {
        return;
      }
      var controlOptions = angular.copy($scope.drawingManagerOptions);
      if (!$scope.markersAndCircleFlag) {
        controlOptions.drawingControlOptions.drawingModes.shift();
        controlOptions.drawingControlOptions.drawingModes.shift();
      }
      $scope.drawingManagerControl.getDrawingManager().setOptions(controlOptions);
    });
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {}};
    $scope.options = {scrollwheel: false};
  });
});
