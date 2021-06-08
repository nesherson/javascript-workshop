const Product = require('../models/product');

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
      path: '/shop/product-list',
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
