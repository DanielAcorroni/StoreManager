const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const storeModels = require('../../../models/storeModel');

describe('Testagem dos models de sales', () => {
  describe('- Quando não existe sale a ser retornada', () => {
    before(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllSales();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeModels.getAllSales();
      expect(result).to.be.empty;
    })
  })
  describe('- Quando existem sales a ser retornadas', () => {
    before(() => {
      const execute = [
        [
          {
            id: 1,
            date: '2022-02-25 15:12:43',
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllSales();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada não está vazia', async () => {
      const result = await storeModels.getAllSales();
      expect(result).not.to.be.empty;
      expect(result.length).to.be.equal(1);
    })
  })
  describe('-Testa se saleFilterById retorna como esperado', () => {
    before(() => {
      const execute = [
        [
          {
            id: 1,
            date: '2022-02-25 15:12:43',
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testagem de objeto retornado pelo create', async () => {
      const filterIdStat = await storeModels.getAllSalesById(1);
      expect(filterIdStat).to.be.an('array');
      expect(filterIdStat[0].id).to.be.equal(1);
      expect(filterIdStat[0]).to.be.include({
        id: 1,
        date: '2022-02-25 15:12:43',
      });
    })
  })
  describe('- Testa se createSale retorna como esperado', () => {
    before(() => {
      const execute = [
          {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 4,
            info: '',
            serverStatus: 2,
            warningStatus: 0
          }
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('- Testagem de objeto retornado pelo create', async () => {
      const createStat = await storeModels.createSaleModel();
      expect(createStat).to.be.an('object');
      expect(createStat.insertId).to.be.equal(4);
      expect(createStat.affectedRows).to.be.equal(1);
    })
  })
})

describe('Testagem dos models de sales_products', () => {
  describe('- Quando não existe sale_product a ser retornada', () => {
    before(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllSalesProducts();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeModels.getAllSalesProducts();
      expect(result).to.be.empty;
    })
  })
  describe('- Quando existem sales_products a ser retornadas', () => {
    before(() => {
      const execute = [
        [
          {
            sale_id: 1,
            product_id: 1,
            quantity: 100,
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllSalesProducts();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada não está vazia', async () => {
      const result = await storeModels.getAllSalesProducts();
      expect(result).not.to.be.empty;
      expect(result.length).to.be.equal(1);
    })
  })
  describe('-Testa se saleProdFilterById retorna como esperado', () => {
    before(() => {
      const execute = [
        [
          {
            sale_id: 1,
            product_id: 1,
            quantity: 100,
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testagem de objeto retornado pelo create', async () => {
      const filterIdStat = await storeModels.getAllSalesProductsById(1);
      expect(filterIdStat).to.be.an('array');
      expect(filterIdStat[0].saleId).to.be.equal(1);
      expect(filterIdStat[0]).to.be.include({
        saleId: 1,
        productId: 1,
        quantity: 100,
      });
    })
  })
})