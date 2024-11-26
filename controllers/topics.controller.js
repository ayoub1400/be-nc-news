const endpoints = require('../endpoints.json')
const { readTopics } = require('../models/topics.model')

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


