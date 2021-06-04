const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);
router.get('/product-list', shopController.getProductList);
router.get('/product-list/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrdersPage);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
