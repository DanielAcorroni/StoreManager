const sinon = require('sinon');
const { expect } = require('chai');

const storeControllers = require('../../../controllers/storeController')

const storeServices = require('../../../services/storeService')

describe('Testagem dos controllers de produtos', () => {
  describe('- Quando não há nenhum produto no BD', () => {
    const mockReq = {};
    const mockRes = {};

    before(() => {
      const execute = [];
      sinon.stub(storeServices, 'productServices').resolves(execute);

      mockReq.body = {};
      mockRes.status = sinon.stub().returns(mockRes);
      mockRes.json = sinon.stub().returns();
    })

    after(() => {
      storeServices.productServices.restore();
    })

    it('Testa se status = 200', async () => {
      await storeControllers.productController(mockReq, mockRes);

      expect(mockRes.status.calledWith(200)).to.be.true;
    })

    it('testa se retorna array vazio', async () => {
      await storeControllers.productController(mockReq, mockRes);

      expect(mockRes.json.calledWith(sinon.match.array)).to.be.true;
    })
  })
})