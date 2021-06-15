const Product = require('../models/product');
//const Order = require('../models/order');

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
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
  Product.fetchAll()
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
  Product.findById(productId)
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
  req.user
    .getCart()
    .then((cartProducts) => {
      res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        cartProducts: cartProducts,
      });
    })
    .catch((err) => {
      console.log('controllers/shop/getCart/err --> ', err);
    });
};

exports.postAddToCart = (req, res, next) => {
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

exports.postDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteItemFromCart(productId)
    .then(() => {
      res.redirect('/cart');
    })
    .catch((err) => {
      console.log('controllers/shop/postDeleteCartItem/err --> ', err);
    });
};

// exports.getOrders = (req, res, next) => {
//   req.user
//     .getOrders({ include: ['products'] })
//     .then((orders) => {
//       res.render('shop/orders', {
//         pageTitle: 'Your Orders',
//         path: '/orders',
//         orders: orders,
//       });
//     })
//     .catch((err) => {
//       console.log('controllers/shop/getOrders/err --> ', err);
//     });
// };

// exports.postOrder = (req, res, next) => {
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return req.user
//         .createOrder()
//         .then((order) => {
//           return order.addProducts(
//             products.map((product) => {
//               product.orderItem = { quantity: product.cartItem.quantity };
//               return product;
//             })
//           );
//         })
//         .catch((err) => {
//           console.log('controllers/shop/postOrder/createOrder/err --> ', err);
//         });
//     })
//     .then(() => {
//       return fetchedCart.setProducts(null);
//     })
//     .then(() => {
//       res.redirect('/orders');
//     })
//     .catch((err) => {
//       console.log('controllers/shop/postOrder/err --> ', err);
//     });
// };
