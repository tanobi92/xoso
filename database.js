let mysql = require('mysql');
let config = require('./config');

let NODE_ENV = process.env.NODE_ENV || 'development2';

let connection = mysql.createConnection(config.mysql[NODE_ENV]);
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

global.database = {mysql: connection};
