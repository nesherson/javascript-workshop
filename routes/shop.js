const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/', shopController.getIndexPage);

router.get('/product-list', shopController.getProductList);
router.get('/product-list/:productId', shopController.getProductDetails);

router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postAddToCart);
router.post('/cart-delete-item', isAuth, shopController.postDeleteCartItem);

router.get('/orders', isAuth, shopController.getOrders);
router.post('/create-order', isAuth, shopController.postOrder);

module.exports = router;
