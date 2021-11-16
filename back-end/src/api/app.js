const express = require('express');
const cors = require('cors');
const { userRouter, loginRouter, productsRouter } = require('../routes');

const app = express();

const error = require('../middlewares/error');

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/images', express.static('public'));
app.use(error);

module.exports = app;
