const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({ origin: '*' }));

const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  },
});
const { setStatusService } = require('../app/services/customerService');

io.on('connection', (socket) => {
  socket.on('Status', (newStatus) => {
    setStatusService(newStatus);
    console.log(newStatus);
  });
});

// require('../socket/status')(io);

const error = require('../middlewares/error');
const { 
  userRouter,
  loginRouter, 
  productsRouter, 
  customerRouter, 
  salesProductsRouter, 
} = require('../routes');

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/customers', customerRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/product', productsRouter);
app.use('/salesProducts', salesProductsRouter);
app.use('/images', express.static('public'));

app.use(error);

module.exports = http;
