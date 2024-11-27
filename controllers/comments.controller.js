const { readCommentsById, insertComment } = require("../models/comments.model")

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

exports.postComment = (req, res, next) => {
    const {username , body} = req.body
    const {article_id} = req.params
    insertComment(article_id, username, body)   
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch(next)
  }