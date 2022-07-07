const storeModels = require('../models/storeModel');

const productValidation = (req, res, next) => {
  const { name } = req.body;
  if (name === undefined) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const doesProdExist = async (req, res, next) => {
  const sales = req.body;
  const prodId = sales.map(({ productId }) => productId);
  const allItens = await storeModels.getAllProducts();
  const allIds = allItens.map(({ id }) => id);
  const prodExist = prodId.every((id) => allIds.includes(id));
  if (!prodExist) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

const saleErrorChecker = (sales) => {
  let error = null;
  sales.forEach(({ quantity, productId }) => {
    if (quantity === undefined) {
      error = { status: 400, message: '"quantity" is required' };
    }
    if (productId === undefined) {
      error = { status: 400, message: '"productId" is required' };
    }
    if (quantity < 1) {
      error = { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
  });
  return error;
};

const saleValidation = (req, res, next) => {
  const sales = req.body;
  const error = saleErrorChecker(sales);
  
  if (error) {
    return res.status(error.status).json({ message: error.message });
  }
  next();
};

module.exports = {
  productValidation,
  saleValidation,
  doesProdExist,
};