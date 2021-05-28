const express = require('express');
const path = require('path');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const { urlencoded } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

app.listen(3000);
