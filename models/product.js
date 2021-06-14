const mongodb = require('mongodb');
const getDb = require('../util/db').getDb;

class Product {
  constructor(id, title, imageUrl, price, description) {
    this._id = new mongodb.ObjectID(id);
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      dbOperation = db.collection('products').updateOne(
        {
          _id: this._id,
        },
        {
          $set: this,
        }
      );
    } else {
      dbOperation = db.collection('products').insertOne(this);
    }

    return dbOperation
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

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongodb.ObjectID(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log('models/product/findById - err: ', err);
      });
  }
}

module.exports = Product;
