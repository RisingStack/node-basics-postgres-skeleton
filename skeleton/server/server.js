'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const config = require('../config').server
const User = require('../model').User
const Comment = require('../model').Comment
const Product = require('../model').Product

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello Wolld!'))

app.get('/users', async function (req, res) {
  let users
  try {
    users = await User.getUsers()
  } catch (err) {
    console.error(err)
    return res.sendStatus(500)
  }

    return res.send(users)
  })

app.get('/products/:productId', async function (req, res) {
  // validate
  const id = parseInt(req.params.productId)
  const product = await Product.getById(id)
  // validate response !!!
  const commentsJSONString = await Comment.getComments(id)

  const comments = JSON.parse(commentsJSONString)
  res.send(Object.assign(product, { comments: comments }))
})

app.post('/users', async function (req, res) {
  try {
    await User.register(req.body.username)
  } catch (err) {
    console.error(err)
    return res.status(403).send({cause: 'UserAlreadyRegistered'})
  }
  res.status(201).send('Success!')
})

app.listen(config.port, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('App is listening at', config.port)
})

module.exports = app
