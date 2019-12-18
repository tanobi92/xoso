let express = require('express');
let router = express.Router();
let lotteryController = require('../controllers/categories/lottery_controller');

/* Router API */
router.get('/lottery', lotteryController.all);

/* Router API V2 */
// router.get('/v2/users', apiController.test_api_getuser);

module.exports = router;