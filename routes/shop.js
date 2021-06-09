const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);

router.get('/product-list', shopController.getProductList);
router.get('/product-list/:productId', shopController.getProductDetails);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postAddToCart);
router.post('/cart-delete-item', shopController.postDeleteCartItem);

module.exports = router;
