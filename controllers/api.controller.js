const endpoints = require('../endpoints.json')
const { readTopics } = require('../models/api.model')

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints })
}

exports.getTopics = (req, res) => {
    readTopics()
    .then(( topics ) => {
        res.status(200).send({ topics })
    })
}