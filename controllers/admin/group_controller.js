/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: User Management
 */

let group_model = require('../../models/mysql/group_model');

let group_controller = {
    index: async (req, res, next) => {
        let list_group = await group_model.all();

        res.render('admin/group', {
            title: "Group | Xoso",
            lang: req.cookies['lang'],
            groups: list_group,
            user: req.user,
            menuItems: req.menuItems,
            scripts: ['/javascript/group.js'],
            active_page: '/admin/group'
        });
    },
    create: async (req, res, next) => {
        let create_group_resp = await group_model.create({
            group_name: req.body.group_name,
            user_id: req.user.user_id,
            status: req.body.status,
            created_date: new Date()
        });

        if (create_group_resp){
            let user_resp = await group_model.findGroupById(create_group_resp.insertId);
            return res.json({status: 200, message: 'Success', data: user_resp[0]});
        }

        return res.json({status: 403, message: 'Error'});
    },
    get_group_by_id: async (req, res, next) => {
        let group_data = await group_model.findGroupById(req.params.id);
        if (group_data && group_data.length > 0) {
            return res.json({status: 200, message: "Success", data: group_data});
        }
        return res.json({status: 304, message: "Error"});
    },
    update: async (req, res, next) => {
        let {group_id} = req.body;
        let group_data = await group_model.findGroupById(group_id);

        if (group_data && group_data.length > 0) {
            let group_obj = Object.assign({
                group_id : group_data[0].group_id,
                modified_date: new Date()
            }, req.body);

            let update_group_resp = await group_model.update(group_obj);
            if (update_group_resp){
                let group_resp = await group_model.findGroupById(group_id);
                return res.json({status: 200, message: "Success", data: group_resp[0]});
            }
            return res.json({status: 304, message: "Error"});
        }
        return res.json({status: 304, message: "Error"});
    },
    delete: async (req, res, next) => {
        let {group_id} = req.body;
        let del_user_resp = await group_model.delete(group_id);
        if (del_user_resp)
            return res.json({status: 200, message: "Success"});

        return res.json({status: 304, message: "Error"});
    }
};

module.exports = group_controller;