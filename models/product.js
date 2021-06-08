const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');

const pathName = path.join(rootDir, 'data', 'products.json');

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
      const updatedProducts = [...products, this];
      fs.writeFile(pathName, JSON.stringify(updatedProducts), (err) => {
        console.log('Product/save/err --> ', err);
      });
    });
  }

  static fetchAllProducts(cb) {
    getFileContentFromPath(cb);
  }
};
