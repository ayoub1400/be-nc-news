const endpoints = require('../endpoints.json')
const { readTopics, readArticleById, readArticles } = require('../models/api.model')

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

exports.getArticles = (req, res, next) => {
    readArticles()
    .then(( articles ) => {
        res.status(200).send({ articles })
    })
    .catch(next)
}
