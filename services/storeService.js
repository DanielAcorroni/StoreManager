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

const createProdService = async (name) => {
  const allProd = await storeModel.getAllProducts();
  const isNameUnique = allProd.some(({ name: prodName }) => prodName === name);
  if (isNameUnique) {
    return false;
  }
  const createStat = await storeModel.createProdModel(name);
  const returnObj = {
    id: createStat.insertId,
    name,
  };
  return returnObj;
};

module.exports = {
  productServices,
  productFilterById,
  createProdService,
};