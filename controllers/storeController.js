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

const salesController = async (_req, res) => {
  const response = await storeServices.salesServices();
  return res.status(200).json(response);
};

const salesByIdController = async (req, res) => {
  const { id } = req.params;
  const response = await storeServices.salesServicesById(id);
  if (!response) {
    return res.status(404).json({ message: 'Sale not found' });
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

const createSaleController = async (req, res) => {
  const sales = req.body;
  const createStat = await storeServices.createSaleService(sales);
  return res.status(201).json(createStat);
};

const updateProdController = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateStat = await storeServices.updateProdService({ id, name });
  if (!updateStat) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(updateStat);
};

module.exports = {
  productController,
  productByIdController,
  createProdController,
  createSaleController,
  salesController,
  salesByIdController,
  updateProdController,
};