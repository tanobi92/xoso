let passport = require("passport");
let passportJWT = require("passport-jwt");
let JwtStrategy = passportJWT.Strategy;
let config = require('./config');

// Load client Model
let user_model = require('./models/mysql/user_model');

let cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};

let jwtOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.jwt.secretOrKey,
    jwtSession: {session: false, failureRedirect: '/login'},
};

module.exports = function () {
    let strategy = new JwtStrategy(jwtOptions, async function (jwt_payload, next) {
        // usually this would be a database call:
        let user = await user_model.findUserById(jwt_payload.user_id);

        if (user !== null && user.length > 0) {
            return next(null, user[0]);
        }

        return next(null, false);
    });

    passport.use(strategy);

    return {
        jwtOptions: jwtOptions,
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("jwt", jwtOptions.jwtSession);
        }
    };
};