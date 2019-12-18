let express = require('express');
let router = express.Router();
let auth = require('../../auth')();
let locationController = require('../../controllers/categories/location_controller');

router.use(auth.authenticate());

router.get('/', locationController.all);

module.exports = router;