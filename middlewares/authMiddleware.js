const jwt = require('jsonwebtoken');

const { COOKIE_SESSION_NAME } = require('../config/environment');
const { SECRET } = require('../config/environment');

// Authenitcation if this user is Valid.
exports.auth = async (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME];

    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(COOKIE_SESSION_NAME);

                //return next(err);
                res.redirect('/auth/login');
            }

            req.user = decodedToken;
            res.locals.user = decodedToken;

            next();
        }));
    } else {
        next();
    }
};
// Authorization of the user. // Route guard
exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }
    next();
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/');
    }
    next();
};