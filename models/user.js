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
    const cartProductIndex = this.cart.items.findIndex(
      (cartProduct) =>
        cartProduct.productId.toString() === product._id.toString()
    );

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectID(product._id),
        quantity: 1,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();

    console.log('user/addToCart/updatedCart: ', updatedCart);

    return db
      .collection('users')
      .updateOne(
        { _id: new mongodb.ObjectID(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectID(id) });
  }
}

module.exports = User;
