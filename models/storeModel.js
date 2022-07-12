const connection = require('./connection');

const serialize = (bdData) => ({
  saleId: bdData.sale_id,
  productId: bdData.product_id,
  quantity: bdData.quantity,
});

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getAllSales = async () => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales;');
  return sales;
};

const getAllSalesProducts = async () => {
  const [salesProducts] = await connection.execute('SELECT * FROM StoreManager.sales_products;');
  return salesProducts.map(serialize);
};

const getAllProductsById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;',
  [id]);
  return products;
};

const getAllSalesById = async (id) => {
  const [sales] = await connection.execute('SELECT * FROM StoreManager.sales WHERE id = ?;',
  [id]);
  return sales;
};

const getAllSalesProductsById = async (saleId) => {
  const [salesProducts] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?;',
    [saleId],
  );
  return salesProducts.map(serialize);
};

const createProdModel = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?);',
    [name],
  );
  return result;
};

const createSaleModel = async () => {
  const [resultSale] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  return resultSale;
};

const createSaleProdModel = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
    [saleId, productId, quantity],
  );
};

module.exports = {
  getAllProducts,
  getAllSales,
  getAllSalesProducts,
  getAllProductsById,
  getAllSalesById,
  getAllSalesProductsById,
  createProdModel,
  createSaleModel,
  createSaleProdModel,
};