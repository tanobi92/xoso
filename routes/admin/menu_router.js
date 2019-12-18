/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: User router
 */

var express = require('express');
var router = express.Router();
let auth = require('../../auth')();
let menuController = require('../../controllers/admin/menu_controller');

router.use(auth.authenticate());

/* GET home page. */
router.get('/', menuController.index);
router.post('/create', menuController.create);
router.get('/:id', menuController.get_menu_by_id);
router.post('/delete', menuController.delete);
router.post('/update', menuController.update);

module.exports = router;