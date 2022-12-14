const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

const storeControllers = require('./controllers/storeController');
const storeMiddlewares = require('./middlewares/storeMiddleware');

app.use(bodyParser.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.get('/products', storeControllers.productController);

app.get('/products/:id', storeControllers.productByIdController);

app.get('/sales', storeControllers.salesController);

app.get('/sales/:id', storeControllers.salesByIdController);

app.post('/products',
  storeMiddlewares.productValidation,
  storeControllers.createProdController);

app.post('/sales',
  storeMiddlewares.saleValidation,
  storeMiddlewares.doesProdExist,
  storeControllers.createSaleController);

app.put('/products/:id',
  storeMiddlewares.productValidation, storeControllers.updateProdController);