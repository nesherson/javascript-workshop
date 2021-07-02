const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndexPage = (req, res) => {
  Product.find()
    .then((products) => {
      res.render('shop/index.ejs', {
        pageTitle: 'Shop',
        path: '/',
        products: products,
        // isAuthenticated: req.session.isLoggedIn,
        // csrfToken: req.csrfToken(),
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getIndexPage/err --> ', err);
    });
};

exports.getProductList = (req, res) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        pageTitle: 'Product List',
        path: '/product-list',
        products: products,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getProductList/err --> ', err);
    });
};

exports.getProductDetails = (req, res) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/shop/product-list',
        product: product,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getProductDetails/err --> ', err);
    });
};

exports.getCart = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts: products,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getCart/err --> ', err);
    });
};

exports.postAddToCart = (req, res) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then((product) => {
      req.user.addToCart(product);
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log('controllers/postAddToCart - err: ', err);
    });
};

exports.postDeleteCartItem = (req, res) => {
  const productId = req.body.productId;
  req.user
    .removeFromCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log('controllers/shop/postDeleteCartItem/err --> ', err);
    });
};

exports.getOrders = (req, res) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders: orders,
        // isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getOrders/err --> ', err);
    });
};

exports.postOrder = (req, res) => {
  console.log('postOrder/user: ', req.user);
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then((user) => {
      console.log('postOrder/populate/user: ', user);
      const products = user.cart.items.map((item) => {
        return { product: { ...item.productId._doc }, quantity: item.quantity };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user._id,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch((err) => {
      console.log('controllers/shop/postOrder/err --> ', err);
    });
};
