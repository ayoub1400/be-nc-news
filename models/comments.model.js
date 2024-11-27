const db = require('../db/connection');

exports.readCommentsById = (articles_id) => {
    const text = `SELECT comment_id, votes, created_at,
    author, body, article_id FROM comments
        WHERE article_id = $1
        ORDER BY created_at ASC;`
    const values = [articles_id];
    return db.query(text, values).then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: 'There are no comments for this article',
        })
    }
    return rows
    })
    
}

exports.insertComment = (article_id, username, body) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *`,
      [username, body, article_id]
    )
    .then(({ rows }) => {
      console.log(rows)
      return rows[0]
    })
}