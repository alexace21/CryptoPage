const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/environment');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        min: 5,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email Address is required.'],
        min:10,
    },
    password: {
        type: String,
        required: [true, 'Invalid password!'],
        min: 4,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;

            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;