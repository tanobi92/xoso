let helpers = require('../../libs/helpers');

let tableName = 'tbl_menu';

let menu_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'menu_model.all', message: e.sqlMessage});
            return false;
        }
    },
    create: async ({href, label, icon, parent_id, order}) => {
        try {
            let query = "insert into tbl_menu(href, label, icon, parent_id, `order`) values(?, ?, ?, ?, ?)";
            return await helpers.promisify(cb => database.mysql.query(query, [href, label, icon, parent_id, order], cb));
        } catch (e) {
            console.log({function: 'Menu.create', message: e.sqlMessage});
            return false;
        }
    },
    findMenuById: async (id_menu) => {
        try {
            let query = `select * from ${tableName} where idtbl_menu=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [id_menu], cb));
        } catch (e) {
            console.log({function: 'Menu.findMenuById', message: e.sqlMessage});
            return false;
        }
    },
    update: async ({href, label, icon, parent_id, order, menu_id}) => {
        try {
            let query = "update tbl_menu set href = ?, label = ?, icon = ?, parent_id = ?, `order` = ? where idtbl_menu = ?";
            return await helpers.promisify(cb => database.mysql.query(query, [href, label, icon, parent_id, order, menu_id], cb));
        } catch (e) {
            console.log({function: 'Menu.update', message: e.sqlMessage});
            return false;
        }
    },
    delete: async (id_menu) => {
        try {
            let query = `delete from ${tableName} where idtbl_menu = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [id_menu], cb)));
        } catch (e) {
            console.log({function: 'Menu.delete', message: e.sqlMessage});
            return false;
        }
    },
    findMenusByUser: async (user_id)=>{
        try {
            let query = `call sp_findMenusByUser2(?)`;
            return await helpers.promisify(cb => database.mysql.query(query, [user_id], cb));
        } catch (e) {
            console.log({function: 'group_menu_model.findMenusByUser', message: e.sqlMessage});
            return false;
        }
    }
};


module.exports = menu_model;