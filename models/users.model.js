const db = require("../db/connection")

exports.readUsers = () => {
  return db.query(`SELECT * FROM users;`)
  .then(({ rows }) => {
    return rows
  })
}