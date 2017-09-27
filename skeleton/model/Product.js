'use strict'
const knex = require('./connection')

const TABLE_NAME = 'products'
const Product = {
  tableName: TABLE_NAME
}

Product.query = function () {
  return knex(TABLE_NAME)
}

/**
 *
 * @param {number} id
 * @returns {knex|Promise.<Product[]>}
 */
Product.getById = function (id) {
  return Product.query()
    .where({ id })
    .select('name', 'price')
    .first()
}

module.exports = Product

