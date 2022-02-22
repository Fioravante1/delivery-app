const { Sale, SalesProduct } = require('../../database/models');

const getAll = async () => {
  try {
  const findCustomer = await Sale.findAll();
  console.log(findCustomer);
  return findCustomer;
} catch (error) {
  console.log(error);
}
};
const getById = async (id) => {
  const findId = await Sale.findByPk(id);
  return findId;
};

const createSalles = async (sale) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, products } = sale;
  const newSale = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
  });

  products.forEach(async ({ id, quantity }) => {
    await SalesProduct.create({ saleId: newSale.id, productId: id, quantity });
  });

  return { data: [{ saleId: newSale.id }] };
};

const setStatusService = async ({ id, status }) => {
  const statusUpdated = await Sale.update({ status }, { where: { id } });
  return statusUpdated;
};

module.exports = {
  getAll,
  getById,
  createSalles,
  setStatusService,
};
