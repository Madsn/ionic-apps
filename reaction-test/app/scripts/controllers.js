"use strict";

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
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

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reaction time', id: 1 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams, $timeout) {

    $scope.gameEnded = false;
    $scope.gameLost = false;
    $scope.gameWon = false;

    $scope.readyCounter = 5;
    $scope.gameTimer = 5000;
    $scope.timerExpired = false;
    $scope.reactionTime = null;
    $scope.gameStarted = null;
    var timer, timer2;

    var runGame = function() {
      timer2 = $timeout(function () {
        $scope.gameTimer = $scope.gameTimer-100;
        if ($scope.gameTimer < 0){
          $scope.timerExpired = true;
          $scope.gameStarted = new Date().getTime();
        } else {
          runGame();
        }
      }, 100);
    };

    var countdown = function() {
      timer = $timeout(function () {
        console.log($scope.readyCounter);
        $scope.readyCounter--;
        if ($scope.readyCounter >= 0){
          countdown();
        } else {
          $scope.gameTimer += Math.random()*100;
          runGame();
        }
      }, 1000);
    };

    countdown();

    function cancelTimers(){
      $timeout.cancel(timer);
      $timeout.cancel(timer2);
    }

    $scope.clicked = function() {
      if ($scope.readyCounter >= 0) return;
      cancelTimers();
      if ($scope.gameTimer >= 0) {
        $scope.gameLost = true;
      } else {
        $scope.gameWon = true;
        $scope.reactionTime = new Date().getTime() - $scope.gameStarted;
      }
      $scope.gameEnded = true;
    };
});
