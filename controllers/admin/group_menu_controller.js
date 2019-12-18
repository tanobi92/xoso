let group_model = require('../../models/mysql/group_model');
let menu_model = require('../../models/mysql/menu_model');
let group_menu_model = require('../../models/mysql/group_menu_model');

let group_menu_controller = {
    index: async (req, res, next) => {
        res.render('admin/group_menu', {
            title: "Group Menu | Xoso",
            lang: req.cookies['lang'],
            user: req.user,
            menuItems: req.menuItems,
            scripts: ['/javascript/group_menu.js'],
            active_page: '/admin/group-menu'
        });
    },
    get_menu: async (req, res, next) =>{
        let data_menu = await menu_model.all();
        let suggestions = [];
        if(data_menu){
            if(req.query.query === ''){
                suggestions.push({
                    data: "",
                    value: "All"
                });
            }
            for (let menu of data_menu) {
                menu.data = menu.idtbl_menu;
                if(menu.parent_id && menu.parent_id !== null){
                    let parent_menu_id = menu.parent_id;
                    let label =  menu.label;
                    let parent_label = data_menu.filter(item => item.idtbl_menu == parent_menu_id);
                    menu.value = parent_label.length > 0 ? parent_label[0].label + " > " + label : label;
                }
                else{
                    menu.value = menu.label;
                }

                suggestions.push(menu);
            }
            res.json({ suggestions: suggestions});
        }
    },
    get_menu_by_id: async(req, res, next) =>{
        let menu_data;
        if(req.body.menu_id === ''){
            menu_data = await await menu_model.all();
        }else {
            menu_data = await menu_model.findMenuById(req.body.menu_id);
        }

        if (menu_data && menu_data.length > 0) {
            return res.json({status: 200, message: "Success", data: menu_data});
        }
        return res.json({status: 403, message: "Error"});
    },
    get_all_group: async(req, res, next) =>{
        let group_data = await group_model.all();
        let suggestions = [];
        if(group_data){
            for (let group of group_data) {
                group.data = group.group_id;
                group.value = group.group_name;
                suggestions.push(group);
            }
            res.json({ suggestions: suggestions});
        }
    },
    get_group_by_id: async(req, res, next) =>{
        let group_id = req.body.group_id;
        let menu_id = await group_menu_model.find_group_id({group_id});
        let menu_data = await menu_model.all();
        if(menu_id && menu_id.length > 0){
            let exit_menu_id = menu_id.map(item => item.menu_id);
            let suggestions = [];
            menu_data.map(item => {
                if(exit_menu_id.includes(item.idtbl_menu)){
                    suggestions.push(item);
                }
            });
            res.json({ status: 200 , suggestions: suggestions});
        }
    },
    save_group_menu: async(req, res, next) =>{

        let list_menu = req.body.list_menu;
        let group_id = req.body.group_id;
        let menu_id = await group_menu_model.find_group_id({group_id});

        if(list_menu && group_id){
            let array_menu = JSON.parse("[" + list_menu + "]");
            let exit_menu_id = menu_id.map(item => item.menu_id);

            let data_insert = [];

            array_menu.map(item => {
                if(!exit_menu_id.includes(item)){
                    data_insert.push(item);
                }
            });

            if(data_insert && data_insert.length > 0){
                let data = data_insert.map(item => [item, parseInt(group_id)]);
                let group_menu_resp = await group_menu_model.create(data);
                if (group_menu_resp){
                    return res.json({status: 200, message: 'Success'});
                }
            }else {
                return res.json({status: 403, message: 'Exits'});
            }
        }
    },
    delete_menu: async(req, res, next) =>{
        let del_group_resp = await group_menu_model.delete({
            menu_id: req.body.menu_id,
            group_id: req.body.group_id
        });
        if (del_group_resp)
            return res.json({status: 200, message: "Success"});

        return res.json({status: 403, message: "Error"});
    }
};

module.exports = group_menu_controller;