let helpers = require('../../libs/helpers');

let tableName = 'tbl_group';

let user_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'Group.all', message: e.sqlMessage});
            return false;
        }
    },
    create: async ({group_name, user_id, status, created_date}) => {
        try {
            let query = `insert into ${tableName}(group_name, user_id, status, created_date) values(?, ?, ?, ?)`;
            return await helpers.promisify(cb => database.mysql.query(query, [group_name, user_id, status, created_date], cb));
        } catch (e) {
            console.log({fuction: 'Group.create', message: e.sqlMessage});
            return false;
        }
    },
    findGroupById: async (group_id) => {
        try {
            let query = `select * from ${tableName} where group_id=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [group_id], cb));
        } catch (e) {
            console.log({fuction: 'Group.findGroupById', message: e.sqlMessage});
            return false;
        }
    },
    update: async ({group_name, user_id, status, modified_date, group_id}) => {
        try {
            let query = `update ${tableName} set group_name = ?, user_id = ?, status = ?, modified_date = ? where group_id = ?`;
            return await helpers.promisify(cb => database.mysql.query(query, [group_name, user_id, status, modified_date, group_id], cb));
        } catch (e) {
            console.log({fuction: 'Group.update', message: e.sqlMessage});
            return false;
        }
    },
    delete: async (group_id) => {
        try {
            let query = `delete from ${tableName} where group_id = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [group_id], cb)));
        } catch (e) {
            console.log({function: 'Group.delete', message: e.sqlMessage});
            return false;
        }
    },
};

module.exports = user_model;