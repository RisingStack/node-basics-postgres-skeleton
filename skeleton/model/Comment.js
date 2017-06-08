'use strict'
const request = require('request-promise-native')

const BASE_URL = 'https://jsonplaceholder.typicode.com/comments'

async function getComments(id) {
  return request(BASE_URL + '?id=' + id)
}

module.exports = {
  getComments
}
