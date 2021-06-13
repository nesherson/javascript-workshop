const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');

const sequelize = require('./util/db');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

const errorController = require('./controllers/error');

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log('app/use/user-findByPk/err --> ', err);
    });
});

app.use(shopRoute);
app.use('/admin', adminRoute);
app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
});
Product.belongsToMany(Cart, { through: CartItem });

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Ben', email: 'ben@test.com' });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .then((err) => {
    console.log('app/sequelize-sync/err --> ', err);
  });
