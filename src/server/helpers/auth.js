const passport = require('passport');
const FBStrategy = require('passport-facebook');

passport.use(new FBStrategy({
  clientID: '747775255428886',
  clientSecret: '71369617ad484a97be3019ebdbb857ee',
  callbackURL: 'http://localhost:8100/auth/login/callback',
  profileFields: ['id', 'displayName', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, {
    profile,
    accessToken,
    refreshToken,
  }));
}));

passport.serializeUser((user, callback) => callback(null, user));

passport.deserializeUser((id, callback) => callback(null, id));

passport.isProtected = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

module.exports = passport;
