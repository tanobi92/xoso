let lotteryLocation = require('../../models/mysql/location_model');
const _ = require('lodash');

let location_controller = {
    all: async (req, res, next) => {
        let result = [];
        try{
            let locations = await lotteryLocation.all();
            if(_.size(locations) > 0) {
                result = locations;
            }
        }
        catch (e) {
            console.log(e);
        }
        res.json(result);
    },

};

module.exports = location_controller;