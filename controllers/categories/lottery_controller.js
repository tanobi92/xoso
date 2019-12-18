let lotteryLocation = require('../../models/mysql/location_model');
let lotteryModel = require('../../models/mysql/lottery_model');
const moment = require('moment');
const _ = require('lodash');

let lottery_controller = {
    index: async (req, res, next) => {
        const locations = await lotteryLocation.all();
        res.render('categories/lottery', {
            title: "Main",
            lang: req.cookies['lang'],
            menuItems: req.menuItems,
            user: req.user,
            data: null,
            locations: locations,
            active_page: '/categories/lottery'
        });
    },
    all: async (req, res, next)=>{
        let result = {};
        const query = req.query;
        try {
            let date = query.date;
            date = moment(date, 'DD/MM/YYYY').format('X');
            let province = query.province;
            
            lotteryModel.all({province, date}, (error, resp) => {
                let data = [];
                if(resp) {
                    data = lottery_controller.formatLottery(resp);
                }
                result = {
                    status: 200,
                    data: data
                };
                return res.json(result);
            });
            
        } catch (e) {
            console.log(e);
            result = {
                status: 403,
                message: e.message
            }
            return res.json(result);
        }
        // console.log(lotteryProvinceData);
        
    },
    formatLottery: (data) => {
        let result = [];
        const cols = ['special', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'symbol'];
        
        _.forEach(data, item => {
            const province = item.province;
            const date = item.date;
            let find = _.find(result, {province: province});
           
            if(!find) {
                find = _.cloneDeep(item);
                result.push(find);
            }

            _.forEach(cols, col => {
                find[col] = lottery_controller.subResult(find[col]);
            });

        });

        return _.sortBy(result, ['province']);
    },
    subResult: (data) => {
        let result = [];
        
        if (data) {
            if (data.indexOf(',') > -1) {
                result = data.split(',');
            } else {
                result = [data];
            }
        }

        return result;
    },

};

module.exports = lottery_controller;