// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive'])

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
.controller('MainCtrl', ['$scope', 'leafletData', function($scope, leafletData){
  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {},
                polygons: [], draw: undefined, options: {disableDefaultUI: true},
                events: {}};

  leafletData.getMap('map').then(function(map) {
    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer;

      if (type === 'marker') {
          // Do marker specific actions
      }

      // Do whatever else you need to. (save to db, add to map etc)
      map.addLayer(layer);
    });
  });


  $scope.debugPrint = function() {
    console.log($scope.map.polygons);
    console.log($scope.map.draw);
  };
}]);
