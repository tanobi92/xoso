let lotteryLocation = require('../../models/mysql/location_model');
let lotteryProvince = require('../../models/mysql/province_model');
const base = require('../base_controller');
const _ = require('lodash');

let province_controller = {
    index: async (req, res, next) => {
        let locations = [];
        let provinces = [];
        try{
            locations = await lotteryLocation.all();
            provinces = await lotteryProvince.all();
        }
        catch (e) {
            console.log(e);
        }

        res.render('categories/province', {
            title: "Lottery Province Management | XOSO",
            user: req.user,
            lang: req.cookies['lang'],
            menuItems: req.menuItems,
            locations: locations,
            provinces: provinces,
            active_page: '/categories/province'
        });
    },
    save: (req, res, next) => {
        const body = req.body;
        const user = req.user;
        try{
            const valid = province_controller.validateUpdateProvince(body);

            if(_.size(valid) > 0 && _.size(user) > 0) {
                return res.json({
                    status: 403,
                    message: valid || 'Error'
                });
            }

            let {provinceId, name, location} = body;
            const code = province_controller.renderCode(name, location);

            if (!provinceId) {
                let data = {...body, code, createdDate: new Date(), createdBy: user.email};
                lotteryProvince.create(data,  (err, resp) => {
                    if(err) {
                        return res.json({status: 403, message: err});
                    }
                    if (resp && resp.affectedRows > 0) {
                        return res.json({status: 200, message: 'created'});
                    }
                });

            } else {
                let data = {...body, code, updatedDate: new Date(), updatedBy: user.email};
                lotteryProvince.update(data,  (err, resp) => {
                    if(err) {
                        return res.json({status: 403, message: err});
                    }
                    if (resp && resp.affectedRows > 0) {
                        return res.json({status: 200, message: 'created'});
                    }
                });
            }
        }
        catch (e) {
            console.log(e);
            return res.json({status: 403, message: 'Error'});
        }
        finally {

        }
    },
    delete: (req, res, next) => {
        const body = req.body;
        const {provinceId} = body;
        try {
            if (provinceId) {
                lotteryProvince.delete(provinceId,  (err, resp) => {
                    if(err) {
                        return res.json({status: 403, message: err});
                    }
                    if (resp && resp.affectedRows > 0) {
                        return res.json({status: 200, message: 'deleted'});
                    }
                });
            } else {
                return res.json({status: 403, message: 'Error'});
            }
        } catch (e) {
            console.log(e);
            return res.json({status: 403, message: e.message});
        }
    },
    get_all: async (req, res, next)=>{
        let lotteryProvinceData = await lotteryProvince.findAll();
        // console.log(lotteryProvinceData);
        return res.json({status: 200, data: lotteryProvinceData});
    },
    get: async (req, res, next)=>{
        let result = {};
        const query = req.query;
        try {
            let count = await lotteryProvince.count();
            if(_.size(count) > 0) {
                count = count[0].count;
            } else {
                count = 0;
            }
            let limit = query.limit;
            let offset = query.offset;
            let province = query.province;
            
            if(limit) {
                limit = parseInt(query.limit);
            } else {
                limit = count;
            }
            if(offset) {
                offset = parseInt(query.offset);
            }
            
            result = {
                status: 200,
                total: count,
                list: await lotteryProvince.find({limit: `${offset}, ${limit}`})
            };
        } catch (e) {
            console.log(e);
            result = {
                status: 403,
                message: e.message
            }
        }
        // console.log(lotteryProvinceData);
        return res.json(result);
    },
    get_by_id: async (req, res, next)=>{
        let provinceId = req.params.provinceId;
        let lotteryProvinceData = await lotteryProvince.findById(provinceId);
        // console.log(lotteryProvinceData);
        return res.json({status: 200, data: lotteryProvinceData});
    },
    get_by_location: async (req, res, next)=>{
        let result = [];
        const query = req.query;
        let lotteryProvinceData = await lotteryProvince.findByLocation(query.code);
        if(lotteryProvinceData) {
            result = lotteryProvinceData;
        }
        return res.json(result);
    },
    validateUpdateProvince: (data) => {
        let result = [];
        let {name, location, status} = data;

        if(!name) {
            result.push('Tên Tỉnh/TP không để trống');
        }
        if(!location) {
            result.push('Vùng miền không để trống');
        }
        if(!location) {
            result.push('Trạng thái không để trống');
        }

        return result;
    },
    renderCode: (provinceName, location) => {
        let result = '';

        if(provinceName && location) {
            provinceName = base.xoa_dau(provinceName);

            const split =provinceName.split(/\s+/);
            let firsts = [];

            _.forEach(split, item => {
                firsts.push(item.charAt(0).toLocaleUpperCase());
            });

            result = `${location}_${firsts.join('')}`;
        }

        return result;
    },
    post: async (req, res, next)=>{
        let result = {};
        const query = req.body;
        try {
            let count = await lotteryProvince.count();
            if(_.size(count) > 0) {
                count = count[0].count;
            } else {
                count = 0;
            }
            const sizePage = parseInt(query.limit) || 10;
            let current = parseInt(query.offset) || 0;
            result = {
                status: 200,
                total: count,
                list: await lotteryProvince.find({limit: `${current}, ${sizePage === -1? count: sizePage}`})
            };
        } catch (e) {
            console.log(e);
            result = {
                status: 403,
                message: e.message
            }
        }
        // console.log(lotteryProvinceData);
        return res.json(result);
    },
};

module.exports = province_controller;