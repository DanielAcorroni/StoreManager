const app = require('./app');
require('dotenv').config();
const bodyParser = require('body-parser');
const storeControllers = require('./controllers/storeController');
app.use(bodyParser.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

app.get('/products', storeControllers.productController);

