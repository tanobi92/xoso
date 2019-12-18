let helpers = require('../../libs/helpers');

const tableName = 'tbl_location';

let Location_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'LotteryLocation.all', message: e.sqlMessage});
            return false;
        }
    },
    all2: () => {
        try {
            let query = `select * from ${tableName}`;
            return helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'LotteryLocation.all', message: e.sqlMessage});
            return false;
        }
    },
    findAll: async ({ limit }) => {
        try {
            let query = `select * from ${tableName} limit ${limit}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'LotteryLocation.findAll', message: e.sqlMessage});
            return false;
        }
    },
    create: async ({name, code, status}) => {
        try {
            let query = `insert into ${tableName} (name, code, status) values (?, ?, ?, ?, ?)`;
            return await helpers.promisify((cb => database.mysql.query(query, [name, code, status], cb)));
        } catch (e) {
            console.log({function: 'LotteryLocation.create', message: e.sqlMessage});
            return false;
        }
    },
    update: async ({lottery_location_id, name, code, status}) => {
        try {
            let query = `update ${tableName} set name = ?, code = ?, status=? where lottery_location_id = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [name, code, status, lottery_location_id], cb)));
        } catch (e) {
            console.log({function: 'LotteryLocation.update', message: e.sqlMessage});
            return false;
        }
    },
    delete: async (lottery_location_id) => {
        try {
            let query = `delete from ${tableName} where lottery_location_id = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [lottery_location_id], cb)));
        } catch (e) {
            console.log({function: 'LotteryLocation.delete', message: e.sqlMessage});
            return false;
        }
    },
    findById: async (lottery_location_id) => {
        try {
            let query = `select * from ${tableName} where lottery_location_id=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [lottery_location_id], cb));
        } catch (e) {
            console.log({function: 'LotteryLocation.findById', message: e.sqlMessage});
            return false;
        }
    },
    findByCode: async (code) => {
        try {
            let query = `select * from ${tableName} where code=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [code], cb));
        } catch (e) {
            console.log({function: 'LotteryLocation.findByCode', message: e.sqlMessage});
            return false;
        }
    }
};

module.exports = Location_model;