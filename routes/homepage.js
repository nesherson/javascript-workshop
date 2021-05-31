const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
  res.render('homepage.ejs', { pageTitle: 'Homepage' });
});

router.post('/users', (req, res, next) => {
  users.push({ name: req.body.name });
  res.redirect('/users');
});

exports.routes = router;
exports.userData = users;
