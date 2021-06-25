const mongoose = require('mongoose');

const Product = require('./product');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (cartProduct) => cartProduct.productId.toString() === product._id.toString()
  );

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  this.cart.items = updatedCartItems;
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');

// const getDb = require('../util/db').getDb;

// class User {
//   constructor(id, username, email, cart) {
//     this._id = id;
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//   }

//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(
//       (cartProduct) =>
//         cartProduct.productId.toString() === product._id.toString()
//     );

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = updatedCartItems[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectID(product._id),
//         quantity: 1,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };

//     const db = getDb();

//     console.log('user/addToCart/updatedCart: ', updatedCart);

//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectID(this._id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((product) => {
//           const productQuantity = this.cart.items.find(
//             (item) => item.productId.toString() === product._id.toString()
//           ).quantity;
//           return { ...product, quantity: productQuantity };
//         });
//       })
//       .catch((err) => {
//         console.log('user/getCart - err: ', err);
//       });
//   }

//   deleteItemFromCart(id) {
//     const updatedCartItems = this.cart.items.filter(
//       (item) => item.productId.toString() !== id.toString()
//     );

//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new mongodb.ObjectID(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectID(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(() => {
//         this.cart = { items: [] };
//         return db.collection('users').updateOne(
//           {
//             _id: new mongodb.ObjectID(this._id),
//           },
//           {
//             $set: { cart: { items: [] } },
//           }
//         );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new mongodb.ObjectID(this._id) })
//       .toArray();
//   }

//   static findById(id) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: new mongodb.ObjectID(id) });
//   }
// }

// module.exports = User;
