const { readArticleById, readArticles, updateArticle } = require("../models/articles.model")

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

exports.patchArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { inc_votes } = req.body;
    updateArticle(article_id, inc_votes)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch(next);
  };