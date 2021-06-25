const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  console.log('--getAddProduct--');
  res.render('admin/add-product.ejs', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({ title, imageUrl, price, description });
  product
    .save()
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch((err) => {
      console.log('controllers/admin/postAddProduct/err --> ', err);
    });
};

exports.getProductList = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/product-list', {
        pageTitle: 'Product List',
        path: '/admin/product-list',
        products: products,
      });
    })
    .catch((err) => {
      console.log('controllers/admin/getProductList/err --> ', err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
      });
    })
    .catch((err) => {
      console.log('controllers/admin/getEditProduct/err --> ', err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  const product = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedPrice,
    updatedDescription
  );
  return product
    .save()
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch((err) => {
      console.log('controllers/admin/postEditProduct/err --> ', err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch((err) => {
      console.log('controllers/admin/postDeleteProduct/err --> ', err);
    });
};
