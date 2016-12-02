// var express, app, http, io;

(function() {
  'use strict';

  var SCAPI, scapi, express, app, http, io;
  SCAPI = require('./lib/scapi');

  function scapiStart() {
    // hold these so you can unlisten
    scapi = new SCAPI('localhost', 57120);
    scapi.connect();
    // scapi.call(undefined, 'server.boot', []).then(function(r1) {
    //   console.log('server boot ok ', r1);
    //   scapi.call(undefined, 'trucouf.stop', []).then(function(r2) {
    //     console.log('trucouf stop ok ', r2);
    //   });
    // });
  }
  scapiStart();



  function setupExpress() {
    express = require('express');
    app = express();
    http = require('http').Server(app);
    io = require('socket.io')(http);
    io.set('transports', ['websocket']);

    app.use(express.static('public'));

    http.listen(process.env.PORT || 3000, function() {
      console.log('listening on *:3000');
    });

    io.on('connection', function(s) {
      s.on('cmd', function(data, callback) {
        console.log('send cmd', data.cmd, data.args);
        scapi.call(undefined, data.cmd, data.args).then(function(response) {
          console.log('cmd response', response);
          return callback && callback(response);
        });
      });
    });

  }

  setupExpress();


}());
