const express = require('express');
const path = require('path');
const requestId = require('request-id/express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const axios = require('axios');

const passport = require('./helpers/auth');
const logger = require('./helpers/logger');
const routes = require('./routes');

const NODE_ENV = process.env.NODE_ENV || 'UNKNOWN';
const PORT = process.env.PORT || 5000;

const app = express();

const redisClient = redis.createClient({
  host: 'localhost',
  post: 6379,
  prefix: 'facebook-test',
});

const publicPath = path.resolve(__dirname, 'dist/public/');

app.use(requestId({ paramName: 'requestId' }));
app.use(logger.winston);
app.use(logger.express);

app.use(cookieParser());
app.use(bodyParser.json({ limit: '256kb' }));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '256kb',
}));

app.use(session({
  secret: 'mySecret',
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({ redisClient }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(publicPath, { redirect: false }));

routes.bind(app);

app.set('view engine', 'pug');

app.post('/postStatus', (req, res) => {
  axios.post(`https://graph.facebook.com/${req.user.profile.id}/feed`, {
    message: req.body.message,
    access_token: req.user.accessToken,
  }).then((response) => {
    console.log(response.data);
    res.status(201).end(`Post Created, ID: ${response.data.id}`);
  }).catch((error) => {
    console.error(error);
    res.status(500).end('Internal Server Error');
  });
});

app.get('/content', passport.isProtected, (req, res) => {
  res.render(path.join(__dirname, 'views/index.pug'));
});

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
  console.info(`==> 🌎 Running ${NODE_ENV} server`);
});
