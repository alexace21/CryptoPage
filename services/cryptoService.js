const Crypto = require('../models/Crypto');

exports.create = (cryptoId) => Crypto.create(cryptoId);

exports.getAll= () => Crypto.find(); 
exports.getOneDetailed = (cryptoId) => Crypto.findById(cryptoId).populate('owner').populate('purchases');
exports.getOne = (cryptoId) => Crypto.findById(cryptoId);
exports.update = (cryptoId, cryptoData) => Crypto.updateOne({ _id: cryptoId }, { $set: cryptoData }, { runValidators: true });
exports.delete = (cryptoId) => Crypto.deleteOne({_id: cryptoId});