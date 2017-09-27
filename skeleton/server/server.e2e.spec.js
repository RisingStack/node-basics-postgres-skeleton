'use strict'
const request = require('super-request')
const Product = require('../model/Product')
const Comment = require('../model/Comment')
const server = require('../server') // make suer you export app from server!!
const nock = require('nock')
const expect = require('chai').expect

describe('server e2e', function () {
  describe('GET /products/:productId', function () {
    let id
    const testProduct = {
      name: 'test-product',
      price: 999
    }

    beforeEach(async function () {
      [ id ] = await Product.query().insert(testProduct).returning('id')
    })

    afterEach(async function () {
      await Product.query().del().where({ name: testProduct.name })
    })

    it('should return products with comments', async function () {
      const response = await request(server)
        .get(`/products/${id}`)
        .json(true)
        .end()

      delete response.body.comments
      expect(response.body).to.deep.equal(testProduct)
    })

    it('should return products with comments - nock', async function () {
      const mockComment = [ {foo: 'bar', baz: 'bang'} ]
      const mockProduct = Object.assign({}, testProduct, { comments: mockComment })
      nock('https://jsonplaceholder.typicode.com')
        .get('/comments')
        .query({ id })
        .reply(200, mockComment)

      const response = await request(server)
        .get(`/products/${id}`)
        .json(true)
        .end()

      expect(response.body).to.deep.equal(mockProduct)
    })

    // add sinon
  })
})
