const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');

const sequelize = require('./util/db');

const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

const errorController = require('./controllers/error');

app.use(shopRoute);
app.use('/admin', adminRoute);
app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});

User.hasMany(Product);

sequelize
  .sync({ force: true })
  .then((result) => {
    app.listen(3000);
  })
  .then((err) => {
    console.log('app/sequelize-sync/err --> ', err);
  });
