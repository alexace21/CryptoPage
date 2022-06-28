const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorMapper');

const cryptoService = require('../services/cryptoService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/submitOffer', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/submitOffer', isAuth, async (req, res) => {
    const newSubmit = { ...req.body };
    newSubmit.owner = req.user._id;

    if (newSubmit.cryptoImage.startsWith('http')) {
        try {
            const submittedCrypto = await cryptoService.create(newSubmit);
            res.redirect('/market');
        } catch (error) {
            return res.render('crypto/create', { ...req.body, error: getErrorMessage(error) });
        }
    } else {
        return res.render('crypto/create', { ...req.body, error: 'Invalid url link' });
    }

});

module.exports = router;