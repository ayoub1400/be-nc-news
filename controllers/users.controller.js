const { readUsers } = require("../models/users.model")

exports.getUsers = (req, res) => {
    readUsers()
    .then((users) => {
        res.status(200).send({ users })
    })
}