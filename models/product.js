const Cart = require('./cart');
const db = require('../util/db');

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {}

  static fetchAllProducts() {
    return db.execute('SELECT * FROM products');
  }

  static findProductById(id) {}

  static deleteProductById(id) {}
};
