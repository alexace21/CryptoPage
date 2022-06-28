const router = require('express').Router();
const userService = require('../services/authService');
const { COOKIE_SESSION_NAME } = require('../config/environment');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorMapper');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { password, repeatPassword, ...userData } = req.body;

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password mismatch!' });
    }
    try {
        const newUser = await userService.create({ password, ...userData });
        const token = await userService.generateToken(newUser);

        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        // Add mongoose error mapper/handler
        return res.render('auth/register', { error: getErrorMessage(error) });
    }
});

router.post('/login',isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.login(email, password);
        const token = await userService.generateToken(user);

        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        return res.status(401).render('auth/login', { error: getErrorMessage(error) });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_SESSION_NAME);
    res.redirect('/');
});

module.exports = router;