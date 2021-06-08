const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndexPage = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/index.ejs', {
      pageTitle: 'Shop',
      path: '/',
      products: products,
    });
  });
};

exports.getProductList = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('shop/product-list', {
      pageTitle: 'Product List',
      path: '/product-list',
      products: products,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId, (product) => {
    res.render('shop/product-detail', {
      pageTitle: productId,
      path: '/shop/product-list',
      product: product,
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    console.log('getCart --> ', cart);
    Product.fetchAllProducts((products) => {
      const cartProducts = [];

      for (let product of products) {
        const cartProductData = cart.products.find(
          (cartItem) => cartItem.id === product.id
        );

        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts: cartProducts,
      });
    });
  });
};

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findProductById(productId, (product) => {
    Cart.addProductToCart(productId, product.price);
    res.redirect('/product-list');
  });
};
