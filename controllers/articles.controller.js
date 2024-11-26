const { readArticleById, readArticles } = require("../models/articles.model")

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    if (isNaN(article_id)) {
        return res.status(400).send({ msg: 'Bad Request' })
      }
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