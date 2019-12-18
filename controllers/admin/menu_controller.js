/***
 * Author: ThichPV
 * CreatedDate: 2019/10/10 10:20:00
 * Desc: Menu Management
 */
let menu_model = require('../../models/mysql/menu_model');

let menu_controller = {
    index: async (req, res, next) => {
        let list_menu = await menu_model.all();
        res.render('admin/menu', {
            title: "Menu | Xoso",
            lang: req.cookies['lang'],
            user: req.user,
            menus: list_menu,
            menuItems: req.menuItems,
            scripts: ['/javascript/menu.js'],
            active_page: '/admin/menu'
        });
    },
    create: async (req, res, next) => {
        let parent_id = (req.body.parent_id == "") ? null : req.body.parent_id;
        let order = (req.body.order == "") ? null : req.body.order;
        let create_menu_resp = await menu_model.create({
            href: req.body.href,
            label: req.body.label,
            icon: req.body.icon,
            parent_id: parent_id,
            order: order
        });

        if (create_menu_resp){
            let user_resp = await menu_model.findMenuById(create_menu_resp.insertId);
            return res.json({status: 200, message: 'Success', data: user_resp[0]});
        }

        return res.json({status: 403, message: 'Error'});
    },
    get_menu_by_id: async (req, res, next) => {
        let menu_data = await menu_model.findMenuById(req.params.id);
        if (menu_data && menu_data.length > 0) {
            return res.json({status: 200, message: "Success", data: menu_data});
        }
        return res.json({status: 304, message: "Error"});
    },
    update: async (req, res, next) => {
        let {menu_id} = req.body;
        let group_data = await menu_model.findMenuById(menu_id);

        if (group_data && group_data.length > 0) {
            let parent_id = (req.body.parent_id == "") ? null : req.body.parent_id;
            let order = (req.body.order == "") ? null : req.body.order;
            let menu_obj = {
                menu_id : group_data[0].idtbl_menu,
                href: req.body.href,
                label: req.body.label,
                icon: req.body.icon,
                parent_id: parent_id,
                order: order
            };

            let update_group_resp = await menu_model.update(menu_obj);
            if (update_group_resp){
                let group_resp = await menu_model.findMenuById(menu_id);
                return res.json({status: 200, message: "Success", data: group_resp[0]});
            }
            return res.json({status: 304, message: "Error"});
        }
        return res.json({status: 304, message: "Error"});
    },
    delete: async (req, res, next) => {
        let {menu_id} = req.body;
        let del_menu_resp = await menu_model.delete(menu_id);
        if (del_menu_resp)
            return res.json({status: 200, message: "Success"});

        return res.json({status: 304, message: "Error"});
    }
};

module.exports = menu_controller;