const express = require('express');

const passport = require('../helpers/auth');

const router = express.Router();

router.get('/login', passport.authenticate('facebook', {
  authType: 'rerequest',
  scope: ['public_profile', 'publish_actions', 'user_about_me', 'email'],
}));

router.get('/login/callback', passport.authenticate('facebook', {
  failureRedirect: '/auth/login',
}), (req, res) => {
  res.redirect('/content');
});

module.exports = router;
