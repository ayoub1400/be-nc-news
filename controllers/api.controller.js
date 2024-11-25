const endpoints = require('../endpoints.json')
const { readTopics, readArticleById } = require('../models/api.model')

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints })
}

exports.getTopics = (req, res, next) => {
    readTopics()
    .then(( topics ) => {
        res.status(200).send({ topics })
    })
    .catch(next)
}

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    readArticleById(article_id)
    .then(( article ) => {
        res.status(200).send({ article })
    })
    .catch(next)
}