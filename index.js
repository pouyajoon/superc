// var express, app, http, io;

(function() {
  'use strict';

  var SCAPI = require('./lib/scapi');


  function scapiStart() {

    // hold these so you can unlisten
    var scapi = new SCAPI('localhost', 57120);
    scapi.connect();

    scapi.call(undefined, 'server.boot', ['default']).then(function(response) {
      console.log('response', response);
      scapi.call(undefined, 'group.new', []).then(function(response) {
        console.log('response', response);
        scapi.call(undefined, 'synth.new', ['default']).then(function(response) {
          console.log('response', response);
        });
      });
    });

  }

  scapiStart();


}());
