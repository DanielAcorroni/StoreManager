const sinon = require('sinon');
const { expect } = require('chai');

const storeModels = require('../../../models/storeModel');

const storeServices = require('../../../services/storeService');

describe('Testagem de services dos produtos', () => {
  describe('- Testa getAll quando BD está vazio', () => {
    before(() => {
      sinon.stub(storeModels, 'getAllProducts').resolves([]);
    })
    after(() => {
      storeModels.getAllProducts.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.productServices();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeServices.productServices();
      expect(result).to.be.empty;
    })
  })
  describe('- Testa getAll quando BD não está vazio', () => {
    before(() => {
      sinon.stub(storeModels, 'getAllProducts').resolves([{id: 1, name: 'Narutos Kunai'}]);
    })
    after(() => {
      storeModels.getAllProducts.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.productServices();
      expect(result).to.be.an('array');
    })
    it('Testa se array retornada está vazia', async () => {
      const result = await storeServices.productServices();
      expect(result).not.to.be.empty;
    })
    it('Testa se length = 1', async () => {
      const result = await storeServices.productServices();
      expect(result.length).to.be.equal(1);
    })
    it('Testa se retorno está correto', async () => {
      const result = await storeServices.productServices();
      expect(result[0].name).to.be.equal('Narutos Kunai');
    })
  })
  describe('- Testa productFilterById', () => {
    before(() => {
      sinon.stub(storeModels, 'getAllProductsById').resolves([{id: 1, name: 'Narutos Kunai'}]);
    })
    after(() => {
      storeModels.getAllProductsById.restore();
    })
    it('Testa se retorna uma array', async () => {
      const result = await storeServices.productFilterById(1);
      expect(result).to.include({id: 1, name: 'Narutos Kunai'});
    })
    it('Testa se array retornada está vazia', async () => {
      storeModels.getAllProductsById.restore();
      sinon.stub(storeModels, 'getAllProductsById').resolves([]);
      const result = await storeServices.productFilterById(7);
      expect(result).to.be.false;
      storeModels.getAllProductsById.restore();
      sinon.stub(storeModels, 'getAllProductsById').resolves([{id: 1, name: 'Narutos Kunai'}]);
    })
  })
})
