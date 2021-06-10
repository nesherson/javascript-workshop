const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndexPage = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index.ejs', {
        pageTitle: 'Shop',
        path: '/',
        products: products,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getIndexPage/err --> ', err);
    });
};

exports.getProductList = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        pageTitle: 'Product List',
        path: '/product-list',
        products: products,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getProductList/err --> ', err);
    });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/shop/product-list',
        product: product,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getProductDetails/err --> ', err);
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

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findProductById(productId, (product) => {
    Cart.deleteProductFromCart(productId, product.price);
    res.redirect('/cart');
  });
};
