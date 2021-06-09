const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');

const pathName = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

const getFileContentFromPath = (cb) => {
  fs.readFile(pathName, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getFileContentFromPath((products) => {
      if (!this.id) {
        this.id = `${Math.random()}`;
        const updatedProducts = [...products, this];
        fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) => {
          console.log('Product/save/err --> ', err);
        });
      } else {
        const updatedProducts = [...products];
        const index = updatedProducts.findIndex(
          (product) => product.id === this.id
        );
        updatedProducts[index] = this;
        fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) => {
          console.log('Product/save/err --> ', err);
        });
      }
    });
  }

  static fetchAllProducts(cb) {
    getFileContentFromPath(cb);
  }

  static findProductById(id, cb) {
    getFileContentFromPath((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }

  static deleteProductById(id) {
    getFileContentFromPath((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProductFromCart(id, product.price);
        }
      });
    });
  }
};
