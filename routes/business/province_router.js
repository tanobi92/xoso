let express = require('express');
let router = express.Router();
// let auth = require('../../auth')();
let lotteryProvinceContrl = require('../../controllers/categories/province_controller');

// router.use(auth.authenticate());
function verifyAPI(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	//decode token
	if(token && token === 'av') {
		next();
	} else {
		return res.json({
			status: 401,
			message: 'No token provided'
		});
	}
}
router.get('/index', lotteryProvinceContrl.index);
router.get('/all', lotteryProvinceContrl.get_all);
router.get('/', lotteryProvinceContrl.get);
router.post('/update', lotteryProvinceContrl.save);
router.post('/delete', lotteryProvinceContrl.delete);
router.get('/getByID/:lottery_id', lotteryProvinceContrl.get_by_id);
router.get('/province-by-location', lotteryProvinceContrl.get_by_location);

module.exports = router;