const getDb = require('../util/db').getDb;

class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then((result) => {
        console.log('models/product/save - result: ', result);
      })
      .catch((err) => {
        console.log('models/product/save - err: ', err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then()
      .catch((err) => {
        console.log('models/product/fetchAll - err: ', err);
      });
  }
}

module.exports = Product;
