const db = require('../db/connection')

exports.readTopics = () => {
    return db.query(`SELECT * FROM topics`)
    .then(({ rows }) => {
        return rows
    })
}

exports.readArticleById = (articles_id) => {
    const text = `SELECT articles.article_id,
        articles.title, articles.topic, articles.author,
        articles.body, articles.created_at, articles.votes,
        articles.article_img_url FROM articles
        WHERE articles.article_id = $1;`
    const values = [articles_id];
    return db.query(text, values).then(({ rows }) => {
      const article = rows[0]
      if (articles_id > 13) {
        return Promise.reject({
          status: 404,
          msg: `${articles_id} is an invalid id`,
        })
    }
    return article
    })
    
}

exports.readArticles = () => {
    return db.query(`SELECT 
    articles.article_id, articles.title, articles.author,
    articles.topic, articles.created_at, articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`)
    .then(({ rows }) => {
        return rows
    })
}