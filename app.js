const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const connectFlash = require('connect-flash');

require('dotenv').config();

const User = require('./models/user');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error');

const uri = process.env.ATLAS_URI;

const app = express();
const store = new mongoDBStore({
  uri: uri,
  collection: 'sessions',
});

const csrfProtection = csrf();

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(connectFlash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log('app/user/findById - err: ', err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongoose
  .connect(uri, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    app.listen(3000);
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Mongoose connection error: ', err);
  });
