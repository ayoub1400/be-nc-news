const express = require('express')
const { getApi, getTopics } = require('./controllers/api.controller')
const app = express()

/* app.use(express.json())  */

app.get('/api', getApi)

app.get('/api/topics', getTopics)


module.exports = app