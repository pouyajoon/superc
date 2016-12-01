(function() {
  'use strict';
  /*global io, angular, google, moment*/


  var app, socket;
  app = angular.module('myApp', []);

  socket = io({
    transports: ['websocket'],
    upgrade: true,
    log: true
  });

  app.controller('MainController', function($scope) {
    var $on, $emit;
    $scope.logs = [];

    $on = function(key, callback) {
      socket.on(key, function(res) {
        $scope.$apply(function() {
          return callback(res);
        });
      });
    };
    $emit = function(key, data, callback) {
      socket.emit(key, data, function(res) {
        $scope.$apply(function() {
          return callback && callback(res);
        });
      });
    };

    $scope.scapi = function(cmd, args) {
      $emit('cmd', {
        cmd: cmd,
        args: args || []
      }, function(res) {
        $scope.logs.push(res);
      });
    };

    $scope.cmd1 = function() {
      $emit('cmd', {
        cmd: 'explosionFatale',
        args: []
      }, function(res) {
        if (res) {
          $scope.logs.push(res);
        }
      });
    };

    socket.on('connect', function() {
      console.log('connected');
      // $on('game-state', function(gameState) {
      //   console.log('gameState', gameState);

      // });
    });


  });


}());
