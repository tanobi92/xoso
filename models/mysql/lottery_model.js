let helpers = require('../../libs/helpers');
const table = require('./table_name');
const _ = require('lodash');
const tblResult = table.result;
const tblProvince = table.province;
const tblLocation = table.location;

let Result_model = {
	isExist: (data, cb) => {
		try {
			let {province, date} = data;
			let query = `select* from ${tblResult} where province=? and date=?`;
			database.mysql.query(query, [province, date],  (err, resp) => {
				let error = null;
				let result = false;
				if(err) {
					error = err.sqlMessage;
				} else {
					if(_.size(resp) > 0) result = true;
				}
				cb(error, result);
			});
		} catch (e) {
			console.log({function: 'Result_model.isExist', message: e.message,});
			cb(e.message);
		}
	},
	all: (data, cb) => {
		try {
			let {date, province} = data;
			let params = [];
			let query = `select resultId, special, first, second, third, fourth, fifth, sixth, seventh,eighth, symbol, r.createdDate, r.createdBy, 
			r.updatedDate, r.updatedBy, r.province, r.date, p.name as provinceName, l.name as locationName, l.code as location
			from ${tblResult} as r
			join ${tblProvince} as p on r.province = p.code
			join ${tblLocation} as l on l.code = p.location
			where date = ?`;

			params.push(date);
			if (province) {
				query += ' and province = ?';
				params.push(province);
			}
			
			database.mysql.query(query, params,  (err, resp) => {
				let error = null;
				if(err) {
					error = err.sqlMessage;
				}
				cb(error, resp);
			});
		} catch (e) {
			console.log({function: 'Result_model.all', message: e.message,});
			cb(e.message);
		}
	},
	create: (data, cb) => {
		try {
			let query = `insert into ${tblResult} (resultId, special, first, second, third, fourth, fifth, sixth, seventh, eighth, symbol, 
			createdDate, createdBy, updatedDate, updatedBy, province, date) values ?`;
			database.mysql.query(query, [data],  (err, resp) => {
				let error = null;
				if(err) {
					error = err.sqlMessage;
				}
				cb(error, resp);
			});
		} catch (e) {
			console.log({function: 'Result_model.create', message: e.message,});
			cb(e.message);
		}
	},
	createOrUpdate: (data, cb) => {
		try {
			let {special, first, second, third, fourth, fifth, sixth, seventh, eighth, symbol,
				createdDate, createdBy, updatedDate, updatedBy, province, date} = data;
			let query = `call sp_insertOrUpdateResult(?)`;
			database.mysql.query(query, [[special, first, second, third, fourth, fifth, sixth, seventh, eighth, symbol,
				createdDate, createdBy, updatedDate, updatedBy, province, date]],  (err, resp) => {
				let error = null;
				if(err) {
					error = err.sqlMessage;
				}
				cb(error, resp);
			});
		} catch (e) {
			console.log({function: 'Result_model.createOrUpdate', message: e.message,});
			cb(e.message);
		}
	},
};

module.exports = Result_model;