/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: Group router
 */

var express = require('express');
var router = express.Router();
let auth = require('../../auth')();
let groupUserController = require('../../controllers/admin/group_user_controller');

router.use(auth.authenticate());


router.get('/', groupUserController.index);
router.get('/user', groupUserController.get_user);
router.post('/user-id', groupUserController.get_user_by_id);
router.get('/group', groupUserController.get_all_group);
router.post('/group-id', groupUserController.get_group_by_id);
router.post('/save', groupUserController.save_group_user);
router.post('/delete', groupUserController.delete_user);

module.exports = router;