const cryptoService = require('../services/cryptoService');

exports.preloadCrypto = async (req, res, next) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId).lean();

    req.crypto = crypto;

    next();
};

exports.isCryptoOwner = (req, res, next) => {
    if (req.crypto.owner != req.user._id) {
        return next({ message: 'You are not authorized!', status: 401 });
    }

    next();
};