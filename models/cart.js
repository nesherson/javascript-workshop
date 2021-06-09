const path = require('path');
const fs = require('fs');

const rootDir = require('../util/path');
const pathName = path.join(rootDir, 'data', 'cart.json');

const getFileContentFromPath = (cb) => {
  fs.readFile(pathName, (err, fileContent) => {
    if (err) {
      cb({});
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Cart {
  static addProductToCart(id, productPrice) {
    fs.readFile(pathName, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += parseFloat(productPrice);
      fs.writeFile(pathName, JSON.stringify(cart), (err) => {
        console.log('Cart/addProductToCart/err --> ', err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(pathName, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        const cart = JSON.parse(fileContent);
        cb(cart);
      }
    });
  }

  static deleteProductFromCart(id, productPrice) {
    fs.readFile(pathName, (err, fileContent) => {
      let cart;
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const product = cart.products.find((product) => product.id === id);
      cart.products = cart.products.filter((product) => product.id !== id);
      cart.totalPrice -= productPrice * parseFloat(product.qty);
      fs.writeFile(pathName, JSON.stringify(cart), (err) => {
        console.log('Cart/deleteProductFromCart/err --> ', err);
      });
    });
  }
};
