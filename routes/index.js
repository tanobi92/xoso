let express = require('express');
let router = express.Router();
let menu_model = require('../models/mysql/menu_model');
let homeRouter = require('./home_router');
let userRouter = require('./admin/user_router');
let groupRouter = require('./admin/group_router');
let menuRouter = require('./admin/menu_router');
let actionsRouter = require('./business/action_router');
let groupUserRouter = require('./admin/group_user_router');
let groupMenuRouter = require('./admin/group_menu_router');
let provinceRouter = require('./business/province_router');
let locationRouter = require('./business/location_router');
let lotteryRouter = require('./business/lottery_router');
// let auth = require('../auth')();



router.use('/', homeRouter);
// router.use(auth.authenticate());
router.use(async (req, res, next) => {
    req.user = {
        user_id: 2
    };
    if (req.user) {
        let menuItems = [];
        let user_id = req.user.user_id;
        let resp = await menu_model.findMenusByUser(user_id);
        if (!resp) {
            return;
        }
        let items = resp[0];

        let parents = items.filter((item) => {
            return !item.parent_id || item.parent_id === null;
        });

        let childs = items.filter((item) => {
            return item.parent_id && item.parent_id !== null;
        });

        let compare = (a, b) => {
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        };

        parents = parents.sort(compare);
        childs = childs.sort(compare);

        menuItems = [...parents];

        menuItems = await Promise.all(menuItems.map(async (menu) => {
            menu.items = [];
            for (let child of childs) {
                if (child.parent_id === menu.idtbl_menu) {
                    menu.items.push(child);
                }
            }
            return menu;
        }));

        req.menuItems = menuItems;

        next();
    }
});

router.use('/admin/user', userRouter);
router.use('/admin/group', groupRouter);
router.use('/admin/menu', menuRouter);
router.use('/admin/group-users', groupUserRouter);
router.use('/admin/group-menu', groupMenuRouter);
router.use('/categories/lottery', actionsRouter);
router.use('/categories/province', provinceRouter);
router.use('/categories/location', locationRouter);
router.use('/categories/lottery', lotteryRouter);

router.get('/lang/:code', async (req, res, next) => {
    res.cookie('lang', req.params.code);
    res.redirect('/');
});

module.exports = router;