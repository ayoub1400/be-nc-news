const { readCommentsById, insertComment, checkCommentToDelete } = require("../models/comments.model")

exports.getCommentsById = (req, res, next) => {
    const { article_id } = req.params
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

exports.deleteComment = (req, res, next) => {
    const {comment_id} = req.params
    checkCommentToDelete(comment_id)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
}