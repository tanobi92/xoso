const socket = require('socket.io');
const resultModel = require('../models/mysql/lottery_model');
const _ = require('lodash');
const moment = require('moment');
const base = require('../controllers/base_controller');
const helpers = require('../libs/helpers');
/**
 * Server constructor.
 *
 * @param {http.Server|Number|Object} srv http server, port or options
 * @param {Object} [opts]
 * @api public
 */
function SocketIO(server)
{
    var io = socket(server);
    //Group Socket Terminal
    io.of('/shell').on('connection', function (socket) {
        // handle incoming data (client -> server)
        socket.on('data', function (data) {
            term.write(data);
        });

        // handle connection lost
        socket.on('disconnect', function () {

        });
    });

    //Group socket test
    io.of('/test_socket').on('connection', function (socket) {
        console.log('a user connected', socket.id);

        socket.on('hello', function (data) {
            console.log(data + ' is online');
        });

        socket.on('input', async (data) => {
            try {
                if(_.size(data) > 0) {
                    const now = new Date();
                    const strDate = moment(now).format('DD/MM/YYYY'); // quy ve dau ngay
                    let date = moment(strDate, 'DD/MM/YYYY').format('X');
                    date = parseInt(date);
                    data = {...data, date, createdDate: now, updatedDate: now};
                    const insert = await helpers.promisify(cb => resultModel.createOrUpdate(data, cb));
                    if(insert && insert.affectedRows > 0) socket.emit("input_successful", 'Successful');
                }
            } catch (e) {
                socket.emit("input_unsuccessful", e);
            }
        });

        socket.emit("hello.response", "Xin chao cac ban!");
    });

    //Group socket test
    io.of('/lottery').on('connection', (socket) => {

        socket.on('input', async (data) => {
            try {
                if(_.size(data) > 0) {
                    const now = new Date();
                    const strDate = moment(now).format('DD/MM/YYYY'); // quy ve dau ngay
                    let date = moment(strDate, 'DD/MM/YYYY').format('X');
                    date = parseInt(date);
                    data = {...data, date, createdDate: now, updatedDate: now};
                    const insert = await helpers.promisify(cb => resultModel.createOrUpdate(data, cb));
                    if(insert && insert.affectedRows > 0) socket.emit("input_successful", 'Successful');
                }
            } catch (e) {
                socket.emit("input_unsuccessful", e);
            }
        });
        socket.emit("hello", "Socket connected!");
    });
}

/**
 * Module exports.
 */
module.exports = SocketIO;