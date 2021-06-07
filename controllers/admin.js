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
  console.log('controllers/admin --> ', product);
  product.save();
  res.redirect('/');
};
