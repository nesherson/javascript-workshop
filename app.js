const path = require('path');

const express = require('express');
const { urlencoded } = require('body-parser');
const expressHandlebars = require('express-handlebars');

const app = express();

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.engine(
  'hbs',
  expressHandlebars({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);
// app.set('view engine', 'pug'); pug templating engine
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: '404' });
});

app.listen(3000);
