const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://nesh:nesh27@cluster0.eccdp.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then((client) => {
      console.log('connected');
      _db = client.db();
    })
    .catch((err) => {
      console.log('util/db/connect - err: ', err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database Found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
