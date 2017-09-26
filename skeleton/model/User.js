'use strict'
const knex = require('./connection')

const TABLE_NAME = 'products'
const User = {
  tableName: TABLE_NAME
}

User.query = function () {
  return knex(TABLE_NAME)
}

/**
 * Get all users from db
 * @returns {knex|Promise.<User[]>}
 */
User.getUsers = function () {
  return User.query().find()
}

/**
 *
 * @param {string} username
 * @returns {knex|Promise}
 */
User.register = function (username) {
  return User.query().insert(username)
}

module.exports = User
