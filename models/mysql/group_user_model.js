let helpers = require('../../libs/helpers');

let tableName = 'tbl_group_user_rel';

let group_user_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({function: 'group_user_model.all', message: e.sqlMessage});
            return false;
        }
    },
    create: async (arr) => {
        try {
            let query = `insert into ${tableName}(id_user, id_group) values ?`;
            return await helpers.promisify(cb => database.mysql.query(query, [arr], cb));
        } catch (e) {
            console.log({function: 'group_user_model.create', message: e.sqlMessage});
            return false;
        }
    },
    find_group_id: async ({id_group}) => {
        try {
            let query = `select * from ${tableName} where id_group=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [id_group], cb));
        } catch (e) {
            console.log({function: 'group_user_model.find_group_id', message: e.sqlMessage});
            return false;
        }
    },
    delete: async ({id_user, id_group}) => {
        try {
            let query = `delete from ${tableName} where id_user = ? and id_group = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [id_user,id_group], cb)));
        } catch (e) {
            console.log({function: 'delete', message: e.sqlMessage});
            return false;
        }
    },
    findGroupsByUser: async (id_user)=>{
        try {
            let query = `select * from ${tableName} inner join tbl_group on ${tableName}.id_group = tbl_group.group_id where id_user=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [id_user], cb));
        } catch (e) {
            console.log({function: 'group_user_model.findGroupsByUser', message: e.sqlMessage});
            return false;
        }
    }
};

module.exports = group_user_model;