const crypto = require('crypto');
const bcrpyt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const API_KEY = process.env.API_KEY;

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: API_KEY,
    },
  })
);

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
          return transporter
            .sendMail({
              to: email,
              from: 'shop-node123@outlook.com',
              subject: 'Signup Succeeded!',
              html: '<h1>You successfully signed up!</h1>',
            })
            .catch((err) => {
              console.log(
                'controllers/auth/postSignup/transporter.sendMail err: ',
                err
              );
            });
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

exports.getReset = (req, res) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    path: '/reset',
    errorMessage: message,
  });
};

exports.postReset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log('controllers/auth/postReset/randomBytes - err: ', err);
      res.redirect('/reset');
    }

    const token = buffer.toString('hex');
    const email = req.body.email;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          return res.redirect('/reset');
        }

        user.resetToken = token;

        let date = new Date(Date.now());
        date.setTime(
          date.getTime() - new Date().getTimezoneOffset() * 60 * 1000
        );

        user.resetTokenExpiration = date.getTime() + 3600000;
        return user.save();
      })
      .then(() => {
        res.redirect('/');
        return transporter.sendMail({
          to: email,
          from: 'shop-node123@outlook.com',
          subject: 'Password reset',
          html: `
          <p>You requested password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>`,
        });
      })
      .catch((err) => {
        console.log('controllers/auth/postReset/User.findOne - err: ', err);
      });
  });
};

exports.getNewPassword = (req, res) => {
  const token = req.params.token;
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }

      res.render('auth/new-password', {
        pageTitle: 'New Password',
        path: '/new-password',
        errorMessage: message,
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      console.log('controllers/auth/getNewPassword/User.findOne - err: ', err);
    });
};
