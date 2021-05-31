const express = require('express');
const path = require('path');
const { urlencoded } = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const homepageRoute = require('./routes/homepage');
const usersRoute = require('./routes/users');
const pageNotFound = require('./routes/404');

app.use(homepageRoute.routes);
app.use(usersRoute);
app.use(pageNotFound);

app.listen(3000);
