const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    const pathName = path.join(rootDir, 'data', 'cart.json');
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
};
