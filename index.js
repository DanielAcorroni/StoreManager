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