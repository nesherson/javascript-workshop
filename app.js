const express = require('express');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const { urlencoded } = require('body-parser');

const app = express();

app.use(urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(userRoutes);

app.listen(3000);
