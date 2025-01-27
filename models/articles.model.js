const db = require('../db/connection')

exports.readArticleById = (articles_id) => {
    const text = `SELECT articles.article_id,
        articles.title, articles.topic, articles.author,
        articles.body, articles.created_at, articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON comments.article_id = articles.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`
    const values = [articles_id];
    return db.query(text, values).then(({ rows }) => {
      const article = rows[0]
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `${articles_id} is an invalid id`,
        })
    }
    return article
    })
    
}

exports.readArticles = (sort_by = 'created_at', order = 'desc', topic) => {
  const validColumns = [
      'article_id', 'title', 'author', 'body', 'topic', 'created_at', 'votes', 'comment_count'
  ]
  const validOrders = ['asc', 'desc']

  if (!validColumns.includes(sort_by)) {
      return Promise.reject({ status: 400, msg: 'Bad Request' })
  }

  if (!validOrders.includes(order)) {
      return Promise.reject({ status: 400, msg: 'Bad Request' })
  }

  let queryStr = `
      SELECT 
      articles.article_id, articles.title, articles.author,
      articles.body, articles.topic, articles.created_at, articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON comments.article_id = articles.article_id
  `;

  const queryParams = []
  if (topic) {
      queryStr += `WHERE articles.topic = $1 `;
      queryParams.push(topic);
  }

  queryStr += `GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`

  return db.query(queryStr, queryParams)
      .then(({ rows }) => {
          return rows
      })
}

exports.updateArticle = (article_id, inc_votes) => {
    return db
      .query(
        `UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`,
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        return rows[0]
      })
  }