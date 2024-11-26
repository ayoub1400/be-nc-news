const { readCommentsById } = require("../models/comments.model")

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params
    if (isNaN(article_id)) {
        return res.status(400).send({ msg: 'Bad Request' })
      }
    readCommentsById(article_id)
    .then(( comments ) => {
        res.status(200).send({ comments })
    })
    .catch(next)
}