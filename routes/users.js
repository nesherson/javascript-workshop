const express = require('express');
const router = express.Router();

const users = require('./homepage');

router.get('/users', (req, res, next) => {
  res.render('users.ejs', { pageTitle: 'Users', users: users.userData });
});

module.exports = router;
