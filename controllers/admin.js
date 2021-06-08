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

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findProductById(productId, (product) => {
    if (!product) {
      res.redirect('/');
    }
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(
      productId,
      updatedTitle,
      updatedImageUrl,
      updatedPrice,
      updatedDescription
    );

    console.log('postEditProduct --> ', productId);

    updatedProduct.save();

    res.redirect('/admin/product-list');
  });
};
