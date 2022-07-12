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

const salesServices = async () => {
  const salesResponse = await storeModel.getAllSales();
  const salesProductsResponse = await storeModel.getAllSalesProducts();
  const response = [];
  salesProductsResponse.forEach((saleProd) => {
    const filteredSale = salesResponse.filter(({ id }) => Number(id) === Number(saleProd.saleId));
    const saleProdPush = {
      saleId: saleProd.saleId,
      date: filteredSale[0].date,
      productId: saleProd.productId,
      quantity: saleProd.quantity,
    };
    response.push(saleProdPush);
  });
  
  return response;
};

const salesServicesById = async (id) => {
  const salesResponse = await storeModel.getAllSalesById(id);
  const saleProdResponse = await storeModel.getAllSalesProductsById(id);
  const response = [];
  if (salesResponse.length === 0) {
    return false;
  }
  saleProdResponse.forEach(({ productId, quantity }) => {
    const saleProdPush = {
      date: salesResponse[0].date,
      productId,
      quantity,
    };
    response.push(saleProdPush);
  });
  return response;
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

const createSaleService = async (sales) => {
  const createSaleStat = await storeModel.createSaleModel();
  const { insertId: saleId } = createSaleStat;
  await sales.forEach(async ({ productId, quantity }) => {
    await storeModel.createSaleProdModel({ saleId, productId, quantity });
  });
  const returnObj = {
    id: saleId,
    itemsSold: sales,
  };
  return returnObj;
};

const updateProdService = async ({ name, id }) => {
  const allProd = await storeModel.getAllProducts();
  const doesProdExist = allProd.some(({ id: prodId }) => Number(prodId) === Number(id));
  if (!doesProdExist) {
    return false;
  }
  await storeModel.updateProdModel({ name, id });
  const returnObj = {
    id,
    name
  };
  return returnObj;
};

module.exports = {
  productServices,
  productFilterById,
  createProdService,
  createSaleService,
  salesServices,
  salesServicesById,
  updateProdService,
};