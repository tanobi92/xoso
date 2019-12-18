let helpers = require('../../libs/helpers');
const table = require('./table_name');

const province = table.province;
const location = table.location;

let Province_model = {
    all: async () => {
        try {
            let query = `select * from ${province}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'Province_model.all', message: e.sqlMessage});
            return false;
        }
    },
    all2: () => {
        try {
            let query = `select * from ${province}`;
            return helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'Province_model.all2', message: e.sqlMessage});
            return false;
        }
    },
    findAll: async ({ limit }) => {
        try {
            let query = `select * from ${province} limit ${limit}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'Province_model.findAll', message: e.sqlMessage});
            return false;
        }
    },
    create: ({name, code, location, status, createdDate, createdBy}, cb) => {
        try {
            let query = `insert into ${province} (name, code, location, status, createdDate, createdBy) values (?, ?, ?, ?, ?, ?)`;
            database.mysql.query(query, [name, code, location, status, createdDate, createdBy],  (err, resp) => {
                let error = null;
                if(err) {
                    error = err.sqlMessage;
                }
                cb(error, resp);
            });
        } catch (e) {
            console.log({function: 'Province_model.create', message: e.message,});
            cb(e.message);
        }
    },
    update: (data, cb) => {
        try {
            const provinceId = data.provinceId;
            delete data.provinceId;
            let query = `update ${province} set ? where provinceId = ?`;

            database.mysql.query(query, [data, provinceId],  (err, resp) => {
                let error = null;
                if(err) {
                    error = err.sqlMessage;
                }
                cb(error, resp);
            });
        } catch (e) {
            console.log({function: 'Province_model.update', message: e.message,});
            cb(e.message);
        }
    },
    delete: (provinceId, cb) => {
        try {
            let query = `delete from ${province} where provinceId = ?`;

            database.mysql.query(query, [provinceId],  (err, resp) => {
                let error = null;
                if(err) {
                    error = err.sqlMessage;
                }
                cb(error, resp);
            });
        } catch (e) {
            console.log({function: 'Province_model.delete', message: e.message,});
            cb(e.message);
        }
    },
    find: async ({ limit }) => {
        try {
            let query = `select p.provinceId, p.name as provinceName, p.code, p.location, p.createdDate, l.name as locationName
            from ${province} as p
            join ${location} as l on p.location=l.code 
            limit ${limit}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'Province_model.find', message: e.sqlMessage});
            return false;
        }
    },
    findById: async (provinceId) => {
        try {
            let query = `select * from ${province} where provinceId=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [provinceId], cb));
        } catch (e) {
            console.log({function: 'Province_model.findById', message: e.sqlMessage});
            return false;
        }
    },
    findByCode: async (code) => {
        try {
            let query = `select * from ${province} where code=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [code], cb));
        } catch (e) {
            console.log({function: 'Province_model.findByCode', message: e.sqlMessage});
            return false;
        }
    },
    findByLocation: async (code) => {
        try {
            let query = `select * from ${province} where location=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [code], cb));
        } catch (e) {
            console.log({function: 'Province_model.findByLocation', message: e.sqlMessage});
            return false;
        }
    },
    count: () => {
        try {
            let query = `select count(*) as count from ${province}
            join ${location} on ${location}.code=${province}.location`;
            return helpers.promisify(cb => database.mysql.query(query, null, cb));
        } catch (e) {
            console.log({function: 'Province_model.count', message: e.sqlMessage});
            return false;
        }
    }
};

module.exports = Province_model;