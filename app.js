const express = require('express')
const { getApi, getTopics, getArticlesById } = require('./controllers/api.controller')
const { customErrors } = require('./errors')
const app = express()

app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.use(customErrors)

module.exports = app