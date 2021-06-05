const fs = require('fs');
const path = require('path');

const Cart = require('./cart');
const rootDir = require('../util/path');
const pathName = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(pathName, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(pathName, (err, fileContent) => {
      let products = [];

      if (!err) {
        products = JSON.parse(fileContent);
      }

      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) =>
          console.log(err)
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pathName, JSON.stringify(products), (err) =>
          console.log(err)
        );
      }
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findProductById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }
};

// console.log('Person - Delete Error --> ', err);
