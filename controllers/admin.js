const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product.ejs', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, price, description);
  product.save();
  res.redirect('/');
};

exports.getProductList = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render('admin/product-list', {
      pageTitle: 'Product List',
      path: '/admin/product-list',
      products: products,
    });
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findProductById(productId, (product) => {
    if (!product) {
      res.redirect('/');
    }
    console.log('getEditProduct --> ', product);

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
    });
  });
};
