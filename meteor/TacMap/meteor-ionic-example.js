Projects = new Meteor.Collection("Projects");
Tasks = new Meteor.Collection("Tasks");
Polygons = new Meteor.Collection("Polygons3");

if (Meteor.isClient) {
  var app = angular.module('app.example', [
    'angular-meteor',
    'ui.router',
    'ionic',
    'uiGmapgoogle-maps'
  ]);

  function onReady() {
    angular.bootstrap(document, ['app.example']);
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
      .state('tabs', {
        url : '/tabs',
        templateUrl: 'index.ng.html',
        controller: 'TodoCtrl'
      })
      .state('main', {
        url : '/',
        templateUrl: 'main.ng.html',
        controller: 'MainCtrl'
      });
  }]);


  // subscribe to the two collections we use
  Meteor.subscribe('Projects');
  Meteor.subscribe('Tasks');
  Meteor.subscribe('Polygons');

  app.controller('MainCtrl', function($scope, $meteorCollection){
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, bounds: {},
                  options: {disableDefaultUI: true},
                  events: {}};

    $scope.polygons = $meteorCollection(Polygons);

    $scope.sync = function(){
      var id = Math.random()*100000;
      var offset = Math.random()*10;
      var newPoly = {
                id: id,
                path: [
                    {
                        latitude: 20 + offset,
                        longitude: -70 + offset
                    },
                    {
                        latitude: 40 + offset,
                        longitude: -20 + offset
                    },
                    {
                        latitude: 10 + offset,
                        longitude: -35 + offset
                    }
                ],
                stroke: {
                    color: '#6060FB',
                    weight: 3
                },
                editable: true,
                draggable: true,
                geodesic: false,
                visible: true,
                fill: {
                    color: '#ff0000',
                    opacity: 0.8
                }
            };
      $scope.polygons.save(newPoly).then(function(res){
        console.log('Response received');
      });
    };

    $scope.draw = function() {
      $scope.map.draw();
    };

    $scope.debugPrint = function() {
      console.log($scope.polygons);
    };
  });

  app.controller('TodoCtrl', ['$scope', '$meteorCollection', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, $meteorCollection, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicPopup, $cordovaDatePicker) {

      $scope.Projects = $meteorCollection(Projects);
      $scope.Tasks = $meteorCollection(Tasks);

      // A utility function for creating a new project
      // with the given projectTitle
      var createProject = function (projectTitle) {
        var newProject = {
          title: projectTitle,
          active: false
        };
        $scope.Projects.save(newProject).then(function(res) {
          if (res) {
            $scope.selectProject(newProject, $scope.Projects.length - 1);
          }
        });
      };

      // Called to create a new project
      $scope.newProject = function () {
        $ionicPopup.prompt({
          title: 'New Project',
          subTitle: 'Name:'
        }).then(function(res) {
          if (res) {
            createProject(res);
          }
        });
      };

      // Grab the last active, or the first project
      $scope.activeProject = function () {
        var activeProject = $scope.Projects[0];
        angular.forEach($scope.Projects, function (v, k) {
          if (v.active) {
            activeProject = v;
          }
        });
        return activeProject;
      };

      // Called to select the given project
      $scope.selectProject = function (project, index) {
        var selectedProject = $scope.Projects[index];
        angular.forEach($scope.Projects, function (v, k) {
          v.active = false;
        });
        selectedProject.active = true;
        $ionicSideMenuDelegate.toggleLeft();
      };

      // Create our modal
      $ionicModal.fromTemplateUrl('new-task.ng.html', function (modal) {
        $scope.taskModal = modal;
      }, {
        scope: $scope,
        animation: 'slide-in-up'
      });

      //Cleanup the modal when we are done with it!
      $scope.$on('$destroy', function() {
        $scope.taskModal.remove();
      });

      $scope.createTask = function (task) {
        var activeProject = $scope.activeProject();
        if (!activeProject || !task.title) {
          return;
        }

        $scope.Tasks.save({
          project: activeProject._id,
          title: task.title
        });

        $scope.taskModal.hide();

        task.title = "";
      };

      $scope.deleteTask = function (task) {
        $scope.Tasks.delete(task);
      };

      $scope.newTask = function () {
        $scope.task = {};
        $scope.taskModal.show();
      };

      $scope.closeNewTask = function () {
        $scope.taskModal.hide();
      };

      $scope.toggleProjects = function () {
        $ionicSideMenuDelegate.toggleLeft();
      };

      $scope.pickDate = function(task) {
        var options = {date: new Date(), mode: 'date'};
        //var options = {date: new Date(), mode: 'time'}; for time
        /*
        $cordovaDatePicker.show(options).then(function(date){
          task.date = date;
        });
        */
      }
    }
  ]);
}

if (Meteor.isServer) {

  Meteor.publish('Projects', function () {
    return Projects.find({});
  });

  Meteor.publish('Tasks', function () {
    return Tasks.find({});
  });

  Projects.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });

  Tasks.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  });

}