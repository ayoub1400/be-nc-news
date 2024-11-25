const express = require('express')
const { getApi, getTopics, getArticlesById, getArticles } = require('./controllers/api.controller')
const { customErrors, endpointError } = require('./errors')
const app = express()

app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.use(endpointError)

app.use(customErrors)

module.exports = app