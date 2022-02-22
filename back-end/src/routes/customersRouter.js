const express = require('express');

const router = express.Router();

const customerController = require('../app/controllers/customerController');
const { validToken } = require('../middlewares/auth/validJWT');

router.route('/orders/:id')
  .get(customerController.getById);

router.route('/')
  .get(customerController.getAll);

router.route('/')
  .post(validToken, customerController.createSalles);

router.route('/:id')
  .put(customerController.setStatusController);

module.exports = router;
