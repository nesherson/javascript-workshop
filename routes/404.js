const express = require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
  res.status(404).render('404.ejs', { pageTitle: '404' });
});

module.exports = router;
