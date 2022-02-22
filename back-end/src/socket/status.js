const { setStatusSale } = require('../app/services/customerService');

const setStatus = (io) => io.on('connection', (socket) => {
  socket.on('Status', async (statusObject) => {
    console.log('Cheguei');
    await setStatusSale(statusObject);
    io.emit('Status', statusObject);
  });
});

module.exports = setStatus;
