const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');

const storeModels = require('../../../models/storeModel');

describe('Testagem dos models de produtos', () => {
  describe('- Quando não existe produto a ser retornado', () => {
    before(() => {
      const execute = [[]];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllProducts();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeModels.getAllProducts();
      expect(result).to.be.empty;
    })
  })
  describe('- Quando existem produtos a ser retornados', () => {
    before(() => {
      const execute = [
        [
          {
            id: 1,
            name: 'Inosuke Mask',
            quantity: 5,
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testa se getAll retorna uma array', async () => {
      const result = await storeModels.getAllProducts();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada não está vazia', async () => {
      const result = await storeModels.getAllProducts();
      expect(result).not.to.be.empty;
      expect(result.length).to.be.equal(1);
    })
  })
  describe('-Testa se prodFilterById retorna como esperado', () => {
    before(() => {
      const execute = [
        [
          {
            id: 1,
            name: 'Inosuke Mask',
            quantity: 5,
          }
        ]
      ];
      sinon.stub(connection, 'execute').resolves(execute);
    })
    after(() => {
      connection.execute.restore();
    })
    it('Testagem de objeto retornado pelo create', async () => {
      const filterIdStat = await storeModels.getAllProductsById(1);
      expect(filterIdStat).to.be.an('array');
      expect(filterIdStat[0].name).to.be.equal('Inosuke Mask');
      expect(filterIdStat[0]).to.be.include({
        id: 1,
        name: 'Inosuke Mask',
        quantity: 5,
      });
    })
  })
  describe('-Testa se createProduct retorna como esperado', () => {
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
    it('Testagem de objeto retornado pelo create', async () => {
      const testObj = { name:'Tanjiro Katana', quantity: 8 };
      const createStat = await storeModels.createProdModel(testObj);
      expect(createStat).to.be.an('object');
      expect(createStat.insertId).to.be.equal(4);
      expect(createStat.affectedRows).to.be.equal(1);
    })
  })
})