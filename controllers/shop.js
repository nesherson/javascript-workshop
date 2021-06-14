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

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((products) => {
//           res.render('shop/cart', {
//             pageTitle: 'Cart',
//             path: '/cart',
//             cartProducts: products,
//           });
//         })
//         .catch((err) => {
//           console.log('controllers/shop/getCart/getProducts/err --> ', err);
//         });
//     })
//     .catch((err) => {
//       console.log('controllers/shop/getCart/err --> ', err);
//     });
// };

// exports.postAddToCart = (req, res, next) => {
//   const productId = req.body.productId;
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         let prevQuantity = product.cartItem.quantity;
//         newQuantity = prevQuantity + 1;
//         return product;
//       }

//       return Product.findByPk(productId);
//     })
//     .then((product) => {
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch((err) => {
//       console.log('controllers/shop/postAddToCart/err --> ', err);
//     });
// };

// exports.postDeleteCartItem = (req, res, next) => {
//   const productId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       let product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then(() => {
//       res.redirect('/cart');
//     })
//     .catch((err) => {
//       console.log('controllers/shop/postDeleteCartItem/err --> ', err);
//     });
// };

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
