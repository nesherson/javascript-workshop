const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/db').getDb;

// class Product {
//   constructor(id, title, imageUrl, price, description, userId) {
//     this._id = id ? new mongodb.ObjectID(id) : null;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.price = price;
//     this.description = description;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOperation;
//     if (this._id) {
//       dbOperation = db.collection('products').updateOne(
//         {
//           _id: this._id,
//         },
//         {
//           $set: this,
//         }
//       );
//     } else {
//       dbOperation = db.collection('products').insertOne(this);
//     }

//     return dbOperation
//       .then((result) => {
//         console.log('models/product/save - result: ', result);
//       })
//       .catch((err) => {
//         console.log('models/product/save - err: ', err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then()
//       .catch((err) => {
//         console.log('models/product/fetchAll - err: ', err);
//       });
//   }

//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectID(id) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => {
//         console.log('models/product/findById - err: ', err);
//       });
//   }

//   static deleteById(id) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectID(id) })
//       .then()
//       .catch((err) => {
//         console.log('models/product/deleteById - err: ', err);
//       });
//   }
// }

// module.exports = Product;
