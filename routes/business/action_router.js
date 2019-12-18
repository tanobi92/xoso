let express = require('express');
let router = express.Router();
let auth = require('../../auth')();
let actionController = require('../../controllers/categories/lottery_controller');

router.use(auth.authenticate());

router.get('/', actionController.index);

module.exports = router;