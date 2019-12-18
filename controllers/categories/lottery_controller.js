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
            let temp = {
                "status": 200,
                "data": [
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:13:30.000Z",
                        "createdBy": null,
                        "location": "MB",
                        "locationName": "Xổ số miền Bắc",
                        "province": "MB_TD",
                        "provinceName": "Thủ Đô",
                        "data": [
                            "1QW",
                            "2QD",
                            "1DF",
                            "87915",
                            "55464",
                            "15111",
                            "31545",
                            "48162",
                            "28491",
                            "84615",
                            "61841",
                            "31121",
                            "78158",
                            "1205",
                            "8765",
                            "1591",
                            "1549",
                            "0212",
                            "8481",
                            "0132",
                            "8400",
                            "0248",
                            "8423",
                            "533",
                            "666",
                            "351",
                            "12",
                            "46",
                            "63",
                            "50"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MN",
                        "locationName": "Xổ số miền Nam",
                        "province": "MN_AG",
                        "provinceName": "An Giang",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MN",
                        "locationName": "Xổ số miền Nam",
                        "province": "MN_HCM",
                        "provinceName": "Hồ Chí Minh",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MN",
                        "locationName": "Xổ số miền Nam",
                        "province": "MN_VL",
                        "provinceName": "Vĩnh Long",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MT",
                        "locationName": "Xổ số miền Trung",
                        "province": "MT_DN",
                        "provinceName": "Đà Nẵng",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MT",
                        "locationName": "Xổ số miền Trung",
                        "province": "MT_KH",
                        "provinceName": "Khánh Hòa",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    },
                    {
                        "date": 1576602000,
                        "createdDate": "2019-12-18T14:18:44.000Z",
                        "createdBy": null,
                        "location": "MT",
                        "locationName": "Xổ số miền Trung",
                        "province": "MT_PY",
                        "provinceName": "Phú Yên",
                        "data": [
                            "21588",
                            "48781",
                            "21548",
                            "21554",
                            "54848",
                            "0051",
                            "8458",
                            "5158",
                            "3232",
                            "1054",
                            "3569",
                            "5154",
                            "0141",
                            "005",
                            "021",
                            "051",
                            "46",
                            "78"
                        ]
                    }
                ]
            }
            return res.json(temp);
            // lotteryModel.all({province, date}, (error, resp) => {
            //     let data = [];
            //     if(resp) {
            //         data = lottery_controller.formatLottery(resp);
            //     }
            //     result = {
            //         status: 200,
            //         data: data
            //     };
            //     return res.json(result);
            // });
            
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
        const cols = ['symbol', 'special', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
        
        _.forEach(data, item => {
            const province = item.province;
            let find = _.find(result, {province: province});
            let temp = [];

            if(!find) {
                find = {
                    date: item.date,
                    createdDate: item.createdDate,
                    createdBy: item.createdBy,
                    location: item.location,
                    locationName: item.locationName,
                    province: item.province,
                    provinceName: item.provinceName,
                };
                result.push(find);
            }

            _.forEach(cols, col => {
                const split = lottery_controller.subResult(item[col]);
                if(find.location === 'MB') {
                    if(col !== 'eighth') temp = [...temp, ...split];
                } else {
                    if(col !== 'symbol') temp = [...temp, ...split];
                }

            });

            find.data = temp;

        });

        return _.sortBy(result, ['location', 'province']);
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