const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getAllProductsById = async (id) => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products WHERE id = ?;',
  [id]);
  return products;
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
  getAllProductsById,
  createProdModel,
  createSaleModel,
  createSaleProdModel,
};