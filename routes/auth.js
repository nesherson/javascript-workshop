const express = require('express');
const { check, body } = require('express-validator/check');
const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

/*

User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash('error', 'Invalid email or password!');
        return res.redirect('/login');
      }
*/

router.get('/login', authController.getLogin);
router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (!user) {
            return Promise.reject("Email doesn't exist.");
          }
        });
      }),
  ],
  authController.postLogin
);

router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              'Email already exists. Please pick a different one.'
            );
          }
        });
      }),
    body(
      'password',
      'Please enter a password with only numbers and text and at least five characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);
router.get('/reset/:token', authController.getNewPassword);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
