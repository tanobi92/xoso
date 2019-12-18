/***
 * Author: ThichPV
 * CreatedDate: 2019/09/26 10:20:00
 * Desc: User router
 */

var express = require('express');
var router = express.Router();
let auth = require('../../auth')();
let userController = require('../../controllers/admin/user_controller');
let multer = require('multer');

let upload_avata_conf = {
    storage: multer.diskStorage({
        //Setup where the user's file will go
        destination: function (req, file, next) {
            next(null, __dirname + '/../../public/upload/avatar');
        },

        //Then give the file a unique name
        filename: function (req, file, next) {
            const ext = file.originalname.split('.')[1];
            console.log(file);
            next(null, file.originalname.split('.')[0].replace(/ /gi, '_') + '_' + Date.now() + '.' + ext);
        }
    }),

    //A means of ensuring only images are uploaded.
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if (image) {
            console.log('photo uploaded');
            next(null, true);
        } else {
            console.log("file not supported");

            //TODO:  A better message response to user on failure.
            return next();
        }
    }
};
let upload = multer(upload_avata_conf);

router.use(auth.authenticate());
/* GET home page. */
router.get('/', userController.index);
router.post('/create', upload.single("avatar"), userController.create);
router.get('/:id', userController.get_user_by_id);
router.post('/delete', userController.delete);
router.post('/update', upload.single("avatar"), userController.update);

module.exports = router;
