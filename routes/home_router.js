var express = require('express');
const rateLimit = require("express-rate-limit");
var router = express.Router();
// let auth = require('../auth')();
let homeController = require('../controllers/home_controller');

/* GET home page. */
// router.get('/', auth.authenticate(), async function (req, res) {
//     res.redirect("/categories");
// });
router.get('/login', homeController.login);
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
        "Too many accounts created from this IP, please try again after an hour"
});
router.post('/login', homeController.postLogin);
router.get('/register', homeController.register);
router.post('/register', createAccountLimiter, homeController.postRegister);
router.get('/logout', homeController.logout);

module.exports = router;
