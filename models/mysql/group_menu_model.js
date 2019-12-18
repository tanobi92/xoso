let helpers = require('../../libs/helpers');

let tableName = 'tbl_group_menu_rel';

let group_menu_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'group_menu_model.all', message: e.sqlMessage});
            return false;
        }
    },
    create: async (arr) => {
        try {
            let query = `insert into ${tableName}(menu_id, group_id) values ?`;
            return await helpers.promisify(cb => database.mysql.query(query, [arr], cb));
        } catch (e) {
            console.log({function: 'group_menu_model.create', message: e.sqlMessage});
            return false;
        }
    },
    find_group_id: async ({group_id}) => {
        try {
            let query = `select * from ${tableName} where group_id=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [group_id], cb));
        } catch (e) {
            console.log({function: 'group_menu_model.find_group_id', message: e.sqlMessage});
            return false;
        }
    },
    delete: async ({menu_id, group_id}) => {
        try {
            let query = `delete from ${tableName} where menu_id = ? and group_id = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [menu_id,group_id], cb)));
        } catch (e) {
            console.log({function: 'delete', message: e.sqlMessage});
            return false;
        }
    },
    findMenusByUser: async (user_id)=>{
        try {
            let query = `call sp_findMenusByUser(?)`;
            return await helpers.promisify(cb => database.mysql.query(query, [user_id], cb));
        } catch (e) {
            console.log({function: 'group_menu_model.findMenusByUser', message: e.sqlMessage});
            return false;
        }
    }
};

module.exports = group_menu_model;