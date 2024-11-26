const express = require('express')
const { getApi, getTopics } = require('./controllers/topics.controller')
const { customErrors } = require('./errors')
const { getArticlesById, getArticles } = require('./controllers/articles.controller')
const { getCommentsById } = require('./controllers/comments.controller')
const app = express()

app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Not Found' })
  })
 
app.use(customErrors)

module.exports = app