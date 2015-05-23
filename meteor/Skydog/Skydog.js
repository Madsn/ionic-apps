Tasks = new Meteor.Collection("Tasks");

if (Meteor.isClient) {
  var app = angular.module('skydog.main', [
    'angular-meteor',
    'ui.router',
    'ionic'
  ]);

  function onReady() {
    angular.bootstrap(document, ['skydog.main']);
  }

  if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
  }
  else {
    angular.element(document).ready(onReady);
  }


  app.config(['$urlRouterProvider', '$stateProvider',
    function($urlRouterProvider, $stateProvider){

    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url : '/',
        templateUrl: 'client/main/main.ng.html',
        controller: 'MainCtrl'
      });
  }]);

  Meteor.subscribe('Tasks');
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
