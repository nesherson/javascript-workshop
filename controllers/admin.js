const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/add-product.ejs', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product({
    title,
    imageUrl,
    price,
    description,
    userId: req.user._id,
  });
  product
    .save()
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch((err) => {
      console.log('controllers/admin/postAddProduct/err --> ', err);
    });
};

exports.getProductList = (req, res) => {
  Product.find({ userId: req.user._id })
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

exports.getEditProduct = (req, res) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
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

exports.postEditProduct = (req, res) => {
  const productId = req.body.productId;

  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  Product.findById(productId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }

      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescription;

      return product.save().then(() => {
        res.redirect('/admin/product-list');
      });
    })
    .catch((err) => {
      console.log('controllers/admin/postEditProduct/findById/err --> ', err);
    });
};

exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteOne({ _id: productId, userId: req.user._id })
    .then(() => {
      res.redirect('/admin/product-list');
    })
    .catch((err) => {
      console.log('controllers/admin/postDeleteProduct/err --> ', err);
    });
};
