const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://nesh:nesh27@cluster0.eccdp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
    .then((result) => {
      console.log('connected');
      callback(result);
    })
    .catch((err) => {
      console.log('util/db/connect - err: ', err);
    });
};

module.exports = mongoConnect;
