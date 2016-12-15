(function() {
    'use strict';

    var app, socket;
    app = angular.module('myApp', []);

    socket = io({
	transports: ['websocket'],
	upgrade: true,
	log: true
    });


    function getConf() {
	var conf = {
	    up: 5
	};
	if (localStorage.conf) {
	    conf = JSON.parse(localStorage.conf);
	}
	return conf;
    }

    app.controller('MainController', function($scope) {
	var $on, $emit;
	$scope.logs = [];
	$scope.conf = getConf();

	$scope.updateConf = function(){
	    localStorage.conf = JSON.stringify($scope.conf);
	};

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

	$scope.tf = function(cmd, args){
	    return $scope.scapi( 'trucouf.'+cmd, args);
	};
	
	socket.on('connect', function() {
	    console.log('connected');
	});


    });


}());



