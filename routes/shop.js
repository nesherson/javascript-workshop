const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);
router.get('/product-list', shopController.getProductList);
router.get('/product-list/:productId', shopController.getProductDetails);

module.exports = router;
