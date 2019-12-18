var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require("i18n");
const { OpenApiValidator } = require('express-openapi-validator');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

i18n.configure({
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    cookie: 'lang',
    directory: __dirname + '/locales'
});
var routes_api = require('./routes/index_api');
var routes = require('./routes/index');
require('./database');

var app = express();
const apiSpec = path.join(__dirname, 'doc_APIs/api.yaml');
const swaggerDocument = YAML.load(apiSpec);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(i18n.init);

app.use('/', routes);

//Router doc APIs
app.use('/spec', express.static(apiSpec));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//  2. Install the OpenApiValidator on your express app
new OpenApiValidator({
    apiSpec,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
}).install(app).then(() => {
});

//Express Rate Limit
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500 // limit each IP to 100 requests per windowMs
});

// //  apply to all requests
// app.use(limiter);

// only apply to requests that begin with /api/
app.use('/api/', routes_api);
app.use("/api/", limiter);


/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: "Error",
            user: req.user,
            menuItems: req.menuItems,
            message: err.message,
            error: err,
            active_page: "/"
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: "Error",
        user: req.user,
        menuItems: req.menuItems,
        message: err.message,
        error: {},
        active_page: "/"
    });
});


module.exports = app;
