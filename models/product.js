const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');

const getProductsFromFile = (cb) => {
  const pathName = path.join(rootDir, 'data', 'products.json');
  fs.readFile(pathName, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const pathName = path.join(rootDir, 'data', 'products.json');
    fs.readFile(pathName, (err, fileContent) => {
      let products = [];

      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(pathName, JSON.stringify(products), (err) =>
        console.log(err)
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
