let helpers = require('../../libs/helpers');

const tableName = 'tbl_action_confirm';

let Action_main_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'ActionConfirm.all', message: e.sqlMessage});
            return false;
        }
    },
    create: async ({action_name, title, content, user_name, button, created_date}) => {
        try {
            let query = `insert into ${tableName} (action_name, title, content, user_name, button, created_date) values (?, ?, ?, ?, ?, ?)`;
            return await helpers.promisify((cb => database.mysql.query(query, [action_name, title, content, user_name, button, created_date], cb)));
        } catch (e) {
            console.log({function: 'ActionConfirm.create', message: e.sqlMessage});
            return false;
        }
    },
    update: async ({id_action, action_name, title, content, user_name, button, modified_date}) => {
        try {
            let query = `update ${tableName} set action_name = ?, title = ?, content = ?, user_name = ?, button = ?, modified_date = ? where id_action = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [action_name, title, content, user_name, button, modified_date, id_action], cb)));
        } catch (e) {
            console.log({function: 'ActionConfirm.update', message: e.sqlMessage});
            return false;
        }
    },
    delete: async (id_action) => {
        try {
            let query = `delete from ${tableName} where id_action = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [id_action], cb)));
        } catch (e) {
            console.log({function: 'ActionConfirm.delete', message: e.sqlMessage});
            return false;
        }
    },
    findById: async (id) => {
        try {
            let query = `select * from ${tableName} where id_action=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [id], cb));
        } catch (e) {
            console.log({function: 'ActionConfirm.findById', message: e.sqlMessage});
            return false;
        }
    }
};

module.exports = Action_main_model;