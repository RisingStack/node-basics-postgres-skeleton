'use strict'
const request = require('super-request')
const Product = require('../model/Product')
const Comment = require('../model/Comment')
const server = require('../server') // make suer you export app from server!!
const expect = require('chai').expect
const sinon = require('sinon')

describe('server', function () {
  describe('GET /products/:productId', function () {

    const testProduct = {
      _id: 12,
      name: 'test-product',
      price: 999
    }

    it('should return products with comments - sinon', async function () {
      const sandbox = sinon.sandbox.create()
      const mockComment = '[ {"foo": "bar", "baz": "bang"} ]'
      const mockModel = {
        toObject: function () {
          return testProduct
        }
      }
      const expectedComment = JSON.parse(mockComment)
      // next is not mock anymore !!!
      const expectedProduct = Object.assign({}, testProduct, { comments: expectedComment })

      const getCommentStub = sandbox.stub(Comment, 'getComments')
        .returns(Promise.resolve(mockComment))
      const getProductStub = sandbox.stub(Product, 'getById')
        .returns(Promise.resolve(mockModel))

      const response = await request(server)
        .get(`/products/${testProduct._id}`)
        .json(true)
        .end()

      expect(response.body).to.deep.equal(expectedProduct)
      expect(getCommentStub.called).to.be.true
      expect(getCommentStub.callCount).to.be.equal(1)
      expect(getProductStub.called).to.be.true
      expect(getProductStub.callCount).to.be.equal(1)
    })
  })
})
