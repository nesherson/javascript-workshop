const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);
router.get('/product-list', shopController.getProductList);

module.exports = router;
