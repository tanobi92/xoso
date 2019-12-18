
let group_model = require('../../models/mysql/group_model');
let user_model = require('../../models/mysql/user_model');
let group_user_model = require('../../models/mysql/group_user_model');

let group_user_controller = {
    index: async (req, res, next) => {
        res.render('admin/group_user', {
            title: "Group Users | Xoso",
            lang: req.cookies['lang'],
            user: req.user,
            menuItems: req.menuItems,
            scripts: ['/javascript/group_users.js'],
            active_page: '/admin/group-users'
        });
    },
    get_user: async (req, res, next) =>{
        let data_user = await user_model.all();
        let suggestions = [];
        if(data_user){
            if(req.query.query === ''){
                suggestions.push({
                    data: "",
                    value: "All"
                });
            }
            for (let user of data_user) {
                user.data = user.user_id;
                user.value = user.username;
                suggestions.push(user);
            }
            res.json({ suggestions: suggestions});
        }
    },
    get_user_by_id: async(req, res, next) =>{
        let user_data;
        if(req.body.user_id === ''){
            user_data = await await user_model.all();
        }else {
            user_data = await user_model.findUserById(req.body.user_id);
        }

        if (user_data && user_data.length > 0) {
            return res.json({status: 200, message: "Success", data: user_data});
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
        let id_group = req.body.id_group;
        let user_id = await group_user_model.find_group_id({id_group});
        let user_data = await user_model.all();
        if(user_id && user_id.length > 0){
            let exit_user_id = user_id.map(item => item.id_user);
            let suggestions = [];
            user_data.map(item => {
                if(exit_user_id.includes(item.user_id)){
                    suggestions.push(item);
                }
            });
            res.json({ status: 200 , suggestions: suggestions});
        }
    },
    save_group_user: async(req, res, next) =>{

        let list_user = req.body.list_user;
        let id_group = req.body.id_group;
        let user_id = await group_user_model.find_group_id({id_group});

        if(list_user && id_group){
            let array_user = JSON.parse("[" + list_user + "]");
            let exit_user_id = user_id.map(item => item.id_user);

            let data_insert = [];

            array_user.map(item => {
                if(!exit_user_id.includes(item)){
                    data_insert.push(item);
                }
            });

            if(data_insert && data_insert.length > 0){
                let data = data_insert.map(item => [item, parseInt(id_group)]);
                let group_user_resp = await group_user_model.create(data);
                if (group_user_resp){
                    return res.json({status: 200, message: 'Success'});
                }
            }else {
                return res.json({status: 403, message: 'Exits'});
            }
        }
    },
    delete_user: async(req, res, next) =>{
        let del_group_resp = await group_user_model.delete({
            id_user: req.body.id_user,
            id_group: req.body.id_group
        });
        if (del_group_resp)
            return res.json({status: 200, message: "Success"});

        return res.json({status: 403, message: "Error"});
    }
};

module.exports = group_user_controller;