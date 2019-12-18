/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: User Management
 */

let user_model = require('../../models/mysql/user_model');

let user_controller = {
    index: async (req, res, next) => {
        let list_user = await user_model.all();
        // res.json({
        //             users: list_user
        //         })
        res.render('admin/user', {
            title: "Users | Xoso",
            lang: req.cookies['lang'],
            users: list_user,
            user: req.user,
            menuItems: req.menuItems,
            scripts: ['/javascript/users.js'],
            active_page: '/admin/user'
        });
    },
    create: async (req, res, next) => {

        let path_img = req.file ? req.file.path : "";

        let create_user_resp = await user_model.create({
            username: req.body.username,
            password: req.body.password,
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            department: req.body.department,
            status: req.body.status,
            avatar: path_img != "" ? (path_img).match("\\/upload\/(.*)")[0] : "/upload/avatar/avatar-bg.png",
            created_user: req.user.user_id,
            created_date: new Date()
        });

        if (create_user_resp){
            let user_resp = await user_model.findUserById(create_user_resp.insertId);
            return res.json({status: 200, message: 'Success', data: user_resp[0]});
        }

        return res.json({status: 403, message: 'Error'});
    },
    get_user_by_id: async (req, res, next) => {
        let user_data = await user_model.findUserById(req.params.id);
        if (user_data && user_data.length > 0) {
            return res.json({status: 200, message: "Success", data: user_data});
        }
        return res.json({status: 304, message: "Error"});
    },
    update: async (req, res, next) => {
        let {user_id} = req.body;
        let user_data = await user_model.findUserById(user_id);

        if (user_data && user_data.length > 0) {
            if(req.file){
                let path_img = req.file.path;
                user_data = Object.assign({
                    avatar : (path_img).match("\\/upload\/(.*)")[0],
                    user_id : user_data[0].user_id,
                    modified_user: user_data[0].user_id,
                    modified_date: new Date()
                }, req.body);
            }
            else{
                user_data = Object.assign({
                    user_id : user_data[0].user_id,
                    modified_user: user_data[0].user_id,
                    modified_date: new Date()
                }, req.body);
            }

            let update_user_resp = await user_model.update(user_data);
            if (update_user_resp){
                let user_resp = await user_model.findUserById(user_id);
                return res.json({status: 200, message: "Success", data: user_resp[0]});
            }
            return res.json({status: 304, message: "Error"});
        }
        return res.json({status: 304, message: "Error"});
    },
    delete: async (req, res, next) => {
        let {user_id} = req.body;
        let del_user_resp = await user_model.delete(user_id);
        if (del_user_resp)
            return res.json({status: 200, message: "Success"});

        return res.json({status: 304, message: "Error"});
    }
};

module.exports = user_controller;