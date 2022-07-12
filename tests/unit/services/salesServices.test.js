const sinon = require('sinon');
const { expect } = require('chai');

const storeModels = require('../../../models/storeModel');

const storeServices = require('../../../services/storeService');

describe('Testagem de services das sales', () => {
  describe('- Testa getAll quando BD está vazio', () => {
    before(() => {
      sinon.stub(storeModels, 'getAllSales').resolves([]);
      sinon.stub(storeModels, 'getAllSalesProducts').resolves([]);
    })
    after(() => {
      storeModels.getAllSales.restore();
      storeModels.getAllSalesProducts.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.salesServices();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeServices.salesServices();
      expect(result).to.be.empty;
    })
  })
  describe('- Testa getAll quando BD não está vazio', () => {
    before(() => {
      const executeSale = [
        {
          id: 1,
          date: '2022-02-25 15:12:43',
        }
      ];
      const executeSaleProd = [
        {
          saleId: 1,
          productId: 1,
          quantity: 100,
        }
      ];
      sinon.stub(storeModels, 'getAllSales').resolves(executeSale);
      sinon.stub(storeModels, 'getAllSalesProducts').resolves(executeSaleProd);
    })
    after(() => {
      storeModels.getAllSales.restore();
      storeModels.getAllSalesProducts.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.salesServices();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada não está vazia', async () => {
      const result = await storeServices.salesServices();
      expect(result).not.to.be.empty;
    })
    it('Testa se length = 1', async () => {
      const result = await storeServices.salesServices();
      expect(result.length).to.be.equal(1);
    })
    it('Testa se retorno está correto', async () => {
      const result = await storeServices.salesServices();
      expect(result[0]).to.include({
        saleId: 1,
        date: '2022-02-25 15:12:43',
        productId: 1,
        quantity: 100,
      });
    })
  })
  describe('- Testa getAllSalesById e getAllSalesProductsById', () => {
    before(() => {
      const executeSale = [
        {
          id: 1,
          date: '2022-02-25 15:12:43',
        }
      ];
      const executeSaleProd = [
        {
          saleId: 1,
          productId: 1,
          quantity: 100,
        }
      ];
      sinon.stub(storeModels, 'getAllSalesById').resolves(executeSale);
      sinon.stub(storeModels, 'getAllSalesProductsById').resolves(executeSaleProd);
    })
    after(() => {
      storeModels.getAllSalesById.restore();
      storeModels.getAllSalesProductsById.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.salesServicesById(1);
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeServices.salesServicesById(1);
      expect(result).not.to.be.empty;
    })
    it('Testa se retorno está correto', async () => {
      const result = await storeServices.salesServicesById(1);
      expect(result[0]).to.include({
        date: '2022-02-25 15:12:43',
        productId: 1,
        quantity: 100,
      });
    })
  })
})
