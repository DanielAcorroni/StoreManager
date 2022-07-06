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

module.exports = {
  getAllProducts,
  getAllProductsById,
  createProdModel,
};