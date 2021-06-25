const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

//const User = require('./models/user');

const app = express();

const uri = process.env.ATLAS_URI;

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use((req, res, next) => {
//   User.findById('60c7ea79afc8a78321e4ea3b')
//     .then((user) => {
//       req.user = new User(user._id, user.name, user.email, user.cart);
//       console.log('user: ', req.user);
//       next();
//     })
//     .catch((err) => {
//       console.log('app/User.findById - err: ', err);
//     });
// });

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

const errorController = require('./controllers/error');

app.use(shopRoute);
app.use('/admin', adminRoute);
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
