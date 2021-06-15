const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');

const mongoConnect = require('./util/db').mongoConnect;

const User = require('./models/user');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findById('60c7ea79afc8a78321e4ea3b')
    .then((user) => {
      req.user = new User(user._id, user.name, user.email, user.cart);
      console.log('user: ', req.user);
      next();
    })
    .catch((err) => {
      console.log('app/User.findById - err: ', err);
    });
});

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

const errorController = require('./controllers/error');

app.use(shopRoute);
app.use('/admin', adminRoute);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
