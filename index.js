// var express, app, http, io;

(function() {
  'use strict';

  var SCAPI, scapi, express, app, http, io;
  SCAPI = require('./lib/scapi');

  function scapiStart() {
    // hold these so you can unlisten
    scapi = new SCAPI('localhost', 57120);
    // var scapi = new SCAPI('192.168.1.37', 57110);
    scapi.connect();

    // var cmds = ['server.quit', {
    //   cmd: 'server.boot',
    //   args: ['default']
    // }, 'trucouf.explosionFatale'];

    scapi.call(undefined, 'server.quit', []).then(function(r1) {
      console.log('server quit ok ', r1);
      scapi.call(undefined, 'server.boot', ['default']).then(function(r2) {
        console.log('server boot ok ', r2);
        // scapi.call(undefined, 'trucouf.explosionFatale', []).then(function(response) {
        //   console.log('response', response);
        // });
      });
    });
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
