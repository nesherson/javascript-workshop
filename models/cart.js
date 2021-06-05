const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const pathName = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
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
        console.log('Cart Error --> ', err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(pathName, (err, fileContent) => {
      if (err) {
        return;
      }

      const cart = JSON.parse(fileContent);

      const productIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      const updatedCartPrice =
        cart.totalPrice - productPrice * cart.products[productIndex].qty;
      const updatedCartProducts = cart.products.filter(
        (product) => product.id !== id
      );

      const updatedCart = {
        products: updatedCartProducts,
        totalPrice: updatedCartPrice,
      };

      fs.writeFile(pathName, JSON.stringify(updatedCart), (err) => {
        console.log('Cart/deleteProduct - error: ', err);
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
};
