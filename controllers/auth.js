const bcrpyt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
  });
};

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password!');
        return res.redirect('/login');
      }

      bcrpyt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              if (err) {
                console.log(
                  'controllers/auth/postLogin/sessionSave - err: ',
                  err
                );
              }
              res.redirect('/');
            });
          } else {
            req.flash('error', 'Invalid email or password!');
            return res.redirect('/login');
          }
        })
        .catch((err) => {
          console.log('controllers/auth/postLogin/bcrpyt.compare - err: ', err);
          return res.redirect('/login');
        });
    })
    .catch((err) => {
      console.log('app/User.findById - err: ', err);
    });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        req.flash(
          'error',
          'Email already exists. Please pick a different one.'
        );
        return res.redirect('/signup');
      }

      return bcrpyt
        .hash(password, 12)
        .then((hashedPas) => {
          const newUser = new User({
            email: email,
            password: hashedPas,
            cart: { items: [] },
          });

          return newUser.save();
        })
        .then(() => {
          res.redirect('/login');
        })
        .catch((err) => {
          console.log('controllers/auth/postSignup/bcrpyt err: ', err);
        });
    })
    .catch((err) => {
      console.log('controllers/auth/postSignup/user.findOne err: ', err);
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
