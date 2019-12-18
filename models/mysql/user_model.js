let helpers = require('../../libs/helpers');
let tableName = 'tbl_user';

let user_model = {
    all: async () => {
        try {
            let query = `select * from ${tableName}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'Users.all', message: e.sqlMessage});
            return false;
        }
    },
    findAll: async ({ limit }) => {
        try {
            let query = `select * from ${tableName} limit ${limit}`;
            return await helpers.promisify(cb => database.mysql.query(query, cb));
        } catch (e) {
            console.log({fuction: 'Users.findAll', message: e.sqlMessage});
            return false;
        }
    },
    login: async ({email, password}) => {
        try {
            let query = `select * from ${tableName} where (email=? or username=?) and password=md5(?)`;
            return await helpers.promisify(cb => database.mysql.query(query, [email, email, password], cb));
        } catch (e) {
            console.log({fuction: 'Users.login', message: e.sqlMessage});
            return false;
        }
    },
    create: async ({username, password, fullname, email, mobile, department, status, avatar, created_user, created_date}) => {
        try {
            let query = `insert into ${tableName}(username, password, fullname, email, mobile, department, status, avatar, created_user, created_date) values(?, md5(?), ?, ?, ?, ?, ?, ?, ?, ?)`;
            return await helpers.promisify(cb => database.mysql.query(query, [username, password, fullname, email, mobile, department, status, avatar, created_user, created_date], cb));
        } catch (e) {
            console.log({fuction: 'Users.create', message: e.sqlMessage});
            return false;
        }
    },
    findUserById: async (user_id) => {
        try {
            let query = `select * from ${tableName} where user_id=?`;
            return await helpers.promisify(cb => database.mysql.query(query, [user_id], cb));
        } catch (e) {
            console.log({fuction: 'Users.findUserById', message: e.sqlMessage});
            return false;
        }
    },
    update: async ({username, password, fullname, email, mobile, department, status, avatar, modified_user, modified_date, user_id}) => {
        try {
            if (password == '') {
                let query = `update ${tableName} set username = ?, fullname = ?, email = ?, mobile = ?, department = ?,status = ? , avatar = ? , modified_user=? , modified_date = ? where user_id = ?`;
                return await helpers.promisify(cb => database.mysql.query(query, [username, fullname, email, mobile, department, status, avatar, modified_user, modified_date, user_id], cb));
            } else {
                let query = `update ${tableName} set username = ?, password = md5(?), fullname = ?, email = ?, mobile = ?, department = ?,status = ? , avatar = ?, modified_user=? , modified_date = ? where user_id = ?`;
                return await helpers.promisify(cb => database.mysql.query(query, [username, password, fullname, email, mobile, department, status, avatar, modified_user, modified_date, user_id], cb));
            }
        } catch (e) {
            console.log({fuction: 'Users.update', message: e.sqlMessage});
            return false;
        }
    },
    delete: async (user_id) => {
        try {
            let query = `delete from ${tableName} where user_id = ?`;
            return await helpers.promisify((cb => database.mysql.query(query, [user_id], cb)));
        } catch (e) {
            console.log({function: 'Users.delete', message: e.sqlMessage});
            return false;
        }
    },
};

module.exports = user_model;