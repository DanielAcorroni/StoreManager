const storeServices = require('../services/storeService');

const productController = async (_req, res) => {
  const response = await storeServices.productServices();
  return res.status(200).json(response);
};

const productByIdController = async (req, res) => {
  const { id } = req.params;
  const response = await storeServices.productFilterById(id);
  if (!response) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(response);
};

const createProdController = async (req, res) => {
  const { name } = req.body;
  const creationStat = await storeServices.createProdService(name);
  if (!creationStat) {
    return res.status(409).json({ message: 'Product already exists' });
  }
  return res.status(201).json(creationStat);
};

module.exports = {
  productController,
  productByIdController,
  createProdController,
};