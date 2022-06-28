const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/environment');

exports.create = (userData) => User.create(userData);

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    console.log(email);
    console.log(user);

    if (!user) {
        throw { message: 'Cannot find email or password!' };
    }

    const doesExist = await bcrypt.compare(password, user.password);

    if (!doesExist) {
        throw { message: 'Cannot find email or password!' };
    }

    return user;
};

exports.generateToken = (user) => {
    const payload = { _id: user._id, username: user.username, email: user.email, };
    const options = { expiresIn: '2d' };

    const promiseResult = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
    return promiseResult;
};