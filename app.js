const express = require('express')
const { getApi, getTopics } = require('./controllers/topics.controller')
const { customErrors, postgresErrors, endpointErrors } = require('./errors')
const { getArticlesById, getArticles, patchArticle } = require('./controllers/articles.controller')
const { getCommentsById, postComment, deleteComment } = require('./controllers/comments.controller')
const { getUsers } = require('./controllers/users.controller')
const app = express()

app.use(express.json())

app.get('/api', getApi)

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticlesById)

app.get('/api/articles', getArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments', postComment)

app.patch("/api/articles/:article_id", patchArticle)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)

app.use(endpointErrors)

app.use(customErrors)

app.use(postgresErrors)


module.exports = app