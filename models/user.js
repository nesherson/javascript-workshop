const mongodb = require('mongodb');

const getDb = require('../util/db').getDb;

class User {
  constructor(id, username, email, cart) {
    this._id = id;
    this.name = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(
    //   (cartProduct) => cartProduct._id === product._id
    // );
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectID(id) });
  }
}

module.exports = User;
