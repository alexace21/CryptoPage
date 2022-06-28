const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Invalid name!'],
        min: [2, 'Name must be minimum 2 character long.']
    },
    cryptoImage: {
        type: String,
        required: [true, 'Invalid image!']
    },
    price: {
        type: String,
        required: [true, 'Invalid price!'],
        min: [0, 'Price must be positive number.'],
    },
    description: {
        type: String,
        required: [true, 'Invalid description!'],
        min: [10, 'Description must be minimum 10 character long.']
    },
    payMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Invalid payment method']
    },
    purchases: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;