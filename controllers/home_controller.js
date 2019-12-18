let jwt = require('jsonwebtoken');
let auth = require('../auth')();
let user_model = require('../models/mysql/user_model');
let request = require('request');
let helpers = require('../libs/helpers');

let home_controller = {
    login: async (req, res, next) => {
        res.render('login', {
            title: `Login | Xoso`,
            lang: req.cookies['lang'],
        });
    },
    postLogin: async (req, res, next) => {
        let user = await user_model.login(req.body);
        if (user && user.length > 0) {
            let payload = {user_id: user[0].user_id};
            let token = jwt.sign(payload, auth.jwtOptions.secretOrKey, {expiresIn: 10800});
            res.cookie('jwt', token);
            return res.redirect('/');
        }

        return res.redirect('/login');
    },
    // postLogin: async (req, res, next) => {
    //     // g-recaptcha-response is the key that browser will generate upon form submit.
    //     // if its blank or null means user has not selected the captcha, so return the error.
    //     if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
    //         return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    //     }
    //     // Put your secret key here.
    //     var secretKey = "6LdfPsUUAAAAAF6TYc_XoQA4TxbesO5r1tmgDdlH";
    //     // req.connection.remoteAddress will provide IP address of connected user.
    //     var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    //     // Hitting GET request to the URL, Google will respond with success or error scenario.
    //     let response = await helpers.promisify(cb => request.get(verificationUrl, {}, cb));
    //     if(response){
    //         let body = JSON.parse(response.body);
    //         // Success will be true or false depending upon captcha validation.
    //         if(body.success !== undefined && !body.success) {
    //             // return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
    //             return res.redirect('/login');
    //         }
    //         let user = await user_model.login(req.body);
    //         if (user && user.length > 0) {
    //             let payload = {user_id: user[0].user_id};
    //             let token = jwt.sign(payload, auth.jwtOptions.secretOrKey, {expiresIn: 10800});
    //             res.cookie('jwt', token);
    //             return res.redirect('/');
    //         }
    //         // res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
    //     }
    //
    //     return res.redirect('/login');
    // },
    register: async (req, res, next) => {
        res.render('register', {
            title: `Register | Xoso`,
            lang: req.cookies['lang']
        });
    },
    postRegister: async (req, res, next) => {
        let user = await user_model.create(req.body);

        if (user) {
            return res.redirect('/login');
        }

        return res.redirect('/register');
    },
    logout: async (req, res, next) => {
        res.clearCookie('jwt');
        res.redirect('/login');
    }
};


module.exports = home_controller;