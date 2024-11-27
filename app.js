const express = require('express')
const { getApi, getTopics } = require('./controllers/topics.controller')
const { customErrors, postgresErrors, endpointErrors } = require('./errors')
const { getArticlesById, getArticles, patchArticle } = require('./controllers/articles.controller')
const { getCommentsById, postComment } = require('./controllers/comments.controller')
const app = express()

app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments', postComment)

app.patch("/api/articles/:article_id", patchArticle)

app.use(endpointErrors)

app.use(customErrors)

app.use(postgresErrors)

module.exports = app