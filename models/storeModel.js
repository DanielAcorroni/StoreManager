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

module.exports = {
  getAllProducts,
  getAllProductsById,
};