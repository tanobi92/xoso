/***
 * Author: ThichPV
 * CreatedDate: 2019/11/05 14:20:00
 * Desc: Group Menu router
 */

var express = require('express');
var router = express.Router();
let auth = require('../../auth')();
let groupMenuController = require('../../controllers/admin/group_menu_controller');

router.use(auth.authenticate());

router.get('/', groupMenuController.index);
router.get('/menu', groupMenuController.get_menu);
router.post('/menu-id', groupMenuController.get_menu_by_id);
router.get('/group', groupMenuController.get_all_group);
router.post('/group-id', groupMenuController.get_group_by_id);
router.post('/save', groupMenuController.save_group_menu);
router.post('/delete', groupMenuController.delete_menu);

module.exports = router;