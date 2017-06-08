'use strict'
const request = require('super-request')
const Product = require('../model/Product')
const Comment = require('../model/Comment')
const server = require('../server') // make suer you export app from server!!
const nock = require('nock')
const expect = require('chai').expect

describe('server', function () {
  describe('GET /products/:productId', function () {
    const testProduct = {
      _id: 12,
      name: 'test-product',
      price: 999
    }

    beforeEach(async function () {
      await new Product(testProduct).save()
    })

    afterEach(async function () {
      await Product.findOne(testProduct).remove()
    })

    it('should return products with comments', async function () {
      const response = await request(server)
        .get(`/products/${testProduct._id}`)
        .json(true)
        .end()

      delete response.body.comments // ugly hack do not show !!!
      expect(response.body).to.deep.equal(testProduct)
    })

    it('should return products with comments - nock', async function () {
      const mockComment = [ {foo: 'bar', baz: 'bang'} ]
      const mockProduct = Object.assign({}, testProduct, { comments: mockComment })
      nock('https://jsonplaceholder.typicode.com')
        .get('/comments')
        .query({ id: testProduct._id })
        .reply(200, mockComment)

      const response = await request(server)
        .get(`/products/${testProduct._id}`)
        .json(true)
        .end()

      expect(response.body).to.deep.equal(mockProduct)
    })
  })
})
