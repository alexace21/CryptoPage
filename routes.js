const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const cryptoController = require('./controllers/cryptoController');
const alternativeController = require('./controllers/alternativeController');

router.use(homeController);
router.use('/auth', authController)
router.use('/market', cryptoController);
router.use('*', alternativeController);

module.exports = router;