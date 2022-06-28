const router = require('express').Router();

const cryptoService = require('../services/cryptoService');
const { isAuth } = require('../middlewares/authMiddleware');
const { preloadCrypto, isCryptoOwner } = require('../middlewares/cryptoMiddleware');
const { getErrorMessage } = require('../utils/errorMapper');
router.get('/', async (req, res) => {
    const allCrypto = await cryptoService.getAll().lean();

    res.render('crypto/catalog', { allCrypto });
});

router.get('/:cryptoId/details', async (req, res) => {
    const selectedCrypto = await cryptoService.getOneDetailed(req.params.cryptoId).lean();
    const isOwner = selectedCrypto.owner._id == req.user?._id;
    const purchaseGrant = selectedCrypto.purchases.find(x => x._id == req.user?._id);

    res.render('crypto/details', { ...selectedCrypto, isOwner, purchaseGrant });
});

router.get('/:cryptoId/edit', isAuth, preloadCrypto, isCryptoOwner, async (req, res) => {
    res.render('crypto/edit', { ...req.crypto });
});

router.post('/:cryptoId/edit', isAuth, preloadCrypto, isCryptoOwner, async (req, res) => {
    const validUrl = req.body.cryptoImage.startsWith('http');

    if (validUrl) {
        try {
            await cryptoService.update(req.params.cryptoId, req.body);

            res.redirect(`/market/${req.params.cryptoId}/details`);
        } catch (error) {
            res.render('crypto/edit', { ...req.body, error: getErrorMessage(error) });
        }
    } else {
        return res.render('crypto/edit', { ...req.body, error: "Invalid url link!" });

    }
});

router.get('/:cryptoId/delete', isAuth, preloadCrypto, isCryptoOwner, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/market');
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const selectedCrypto = await cryptoService.getOneDetailed(req.params.cryptoId);
    selectedCrypto.purchases.push(req.user?._id);

    await selectedCrypto.save();

    res.redirect(`/market/${req.params.cryptoId}/details`);
});

router.get('/search',isAuth, async (req, res) => {
    const allRecords = await cryptoService.getAll().lean();

    res.render('crypto/search', { allRecords });
});


router.post('/search',isAuth, async (req, res) => {
    const allRecords = await cryptoService.getAll().lean();

    if (req.body.name) {
        const filteredRecords = allRecords.filter(x => x.name == req.body.name);

        const doubleFilter = filteredRecords.find(x => x.payMethod.toLowerCase() == req.body.payMethod.toLowerCase());
        if (doubleFilter) {
            res.render('crypto/searched', { filteredRecords });
        } else {
            res.render('crypto/noMatches');
        }

    } else {
        const filteredRecords = allRecords.filter(x => x.payMethod.toLowerCase() == req.body.payMethod.toLowerCase());
        res.render('crypto/searched', { filteredRecords });
    }

});

module.exports = router;