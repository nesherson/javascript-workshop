const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');

const mongoConnect = require('./util/db').mongoConnect;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', 'views');

//const shopRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');

const errorController = require('./controllers/error');

// app.use(shopRoute);
app.use('/admin', adminRoute);
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
