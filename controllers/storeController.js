const storeServices = require('../services/storeService');

const productController = async (_req, res) => {
  const response = await storeServices.productServices();
  return res.status(200).json(response);
};


module.exports = {
  productController,
};