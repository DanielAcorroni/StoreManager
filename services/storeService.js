const storeModel = require('../models/storeModel');

const productServices = async () => {
  const response = await storeModel.getAllProducts();
  return response;
};


module.exports = {
  productServices,
};