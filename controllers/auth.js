const User = require('../models/user');

exports.getLogin = (req, res) => {
  console.log('isLoggedIn: ', req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  User.findById('60d660c290673c3b6066f4db')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.redirect('/');
      //return req.session.save();
    })
    //.then(() => {})
    .catch((err) => {
      console.log('app/User.findById - err: ', err);
    });
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('controllers/auth/postLogout/sessionDestroy - err: ', err);
    }
    res.redirect('/');
  });
};

// app.use((req, res, next) => {
//   User.findById('60d660c290673c3b6066f4db')
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log('app/User.findById - err: ', err);
//     });
// });
