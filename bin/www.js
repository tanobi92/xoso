#!/usr/bin/nodejs
var debug = require('debug')('my-application');
var app = require('../app');
var SocketIO = require('../services/socket');
app.set('port', process.env.PORT || 3333);
var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log(`Listening on port ${server.address().port}`);
});

//Init SocketIO
SocketIO(server);