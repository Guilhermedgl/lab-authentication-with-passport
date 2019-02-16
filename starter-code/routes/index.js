const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('passport/login');
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/private-page',
  failureRedirect: '/',
  failureFlash: true,
  passReqToCallback: true
}));

router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('passport/private', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
