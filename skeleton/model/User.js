'use strict'

const knex = require('./connection')

const TABLE_NAME = 'users'

const User = {
  tableName: TABLE_NAME
}

User.query = function () {
  return knex(TABLE_NAME)
}

User.getUsers = function () {
  return User.query().select('*')
}

User.register = function (username) {
  return User.query().insert({ username })
}

module.exports = User
