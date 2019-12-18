let express = require('express');
let router = express.Router();
// let auth = require('../../auth')();
let lotteryContrl = require('../../controllers/categories/lottery_controller');

// router.use(auth.authenticate());
router.get('/index', lotteryContrl.index);
router.get('/all', lotteryContrl.all);


module.exports = router;