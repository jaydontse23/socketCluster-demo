var fs = require('fs');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var healthChecker = require('sc-framework-health-check');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);
  var environment = worker.options.environment;

  var app = express();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  if (environment == 'dev') {
    // Log every HTTP request. See https://github.com/expressjs/morgan for other
    // available formats.
    app.use(morgan('dev'));
  }
  app.use(serveStatic(path.resolve(__dirname, 'public')));

  // Add GET /health-check express route
  healthChecker.attach(worker, app);

  httpServer.on('request', app);


  scServer.on('connection', function (socket) {



    socket.on("startGame",function(data){
        // var playerToken = socket.getAuthToken();
        if(data){
          scServer.exchange.publish("pushData",data)
        }
    })


    // socket.on('disconnect', function () {
    //   var playerToken = socket.getAuthToken();

    //   if (playerToken) {
    //     scServer.exchange.publish('player-leave', {
    //       name: playerToken.name
    //     });
    //   }
    // });


  });
};
