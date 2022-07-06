const storeModel = require('../models/storeModel');

const productServices = async () => {
  const response = await storeModel.getAllProducts();
  return response;
};

const productFilterById = async (id) => {
  const response = await storeModel.getAllProductsById(id);
  if (response.length === 0) {
    return false;
  }
  return response[0];
};

module.exports = {
  productServices,
  productFilterById,
};