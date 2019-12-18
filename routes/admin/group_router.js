/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: Group router
 */

var express = require('express');
var router = express.Router();
let auth = require('../../auth')();
let groupController = require('../../controllers/admin/group_controller');

router.use(auth.authenticate());

/* GET home page. */
router.get('/', groupController.index);
router.post('/create', groupController.create);
router.get('/:id', groupController.get_group_by_id);
router.post('/delete', groupController.delete);
router.post('/update', groupController.update);

module.exports = router;
