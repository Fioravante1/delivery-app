import { postAll, getAll, edit } from '../httpService';

export async function apiGetAllSales() {
  try {
    const allUsers = await getAll('/customers');
    return allUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function apiRequestOrdersByID(id) {
  try {
    const allProducts = await getAll(`/salesProducts/${id}`);
    return allProducts;
  } catch (error) {
    console.log(error);
  }
}

async function apiRequestSalesProduct(sale, token) {
  const config = {
    headers: { authorization: token },
  };
  try {
    const users = await postAll('/customers', sale, config);
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function apiUpdateSalesProduct(id, status) {
  try {
    const updateSales = await edit(`/customer/${id}`, status);
    return updateSales;
  } catch (error) {
    console.log(error);
  }
}

export default apiRequestSalesProduct;
