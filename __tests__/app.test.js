const endpointsJson = require("../endpoints.json");
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const app = require('../app')
const request = require('supertest')


beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api", () => {
  test("GET 200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('/api/topics' , () => {
  test('GET 200: Responds with an object of all of the correct topics data' , () => {
      return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
          expect(body.topics).toHaveLength(3)
          body.topics.forEach((topic) => {
             expect(topic).toMatchObject({
              description: expect.any(String),
              slug: expect.any(String),
             }) 
          })
  })
})
})

describe('/api/articles/:article_id' , () => {
  test('GET 200: should give the correct object corresponding to the id given with a status code of 200' , () => {
      return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({ body }) => {
          expect(body.article).toMatchObject(
                  {
                    article_id: 1,
                    title: "Living in the shadow of a great man",
                    topic: "mitch",
                    author: "butter_bridge",
                    body: "I find this existence challenging",
                    created_at: "2020-07-09T20:11:00.000Z",
                    votes: 100,
                    article_img_url:
                      "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
                    }
                
            )
      })
  })
    test('GET 404: should give an appropriate error message when given an invalid id', () => {
    return request(app)
    .get('/api/articles/100')
    .expect(404)
    .then(({ body }) => {
    expect(body.msg).toBe('100 is an invalid id')
     })
  })
  test('GET 400: should give an appropriate error message when given an invalid id that is not a number', () => {
    return request(app)
    .get('/api/articles/notanid')
    .expect(400)
    .then(({ body }) => {
    expect(body.msg).toBe('Bad Request')
     })
  })
})

describe('/api/articles' , () => {
  test('GET 200: Responds with an object of all of the correct articles data ' , () => {
      return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({ body }) => {
          expect(body.articles.length).toBe(13)
          body.articles.forEach((article) => {
             expect(article).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String),
             }) 
          })
  }) 
  })
  test('GET 200: return the data sorted by the date', () => {
    return request(app)
    .get('/api/articles')
    .expect(200)
    .then(({ body }) => {
        expect(body.articles).toHaveLength(13)
        expect(body.articles).toBeSortedBy("created_at", {
            descending: true, 
            coerce: true,
        })
    })
  })
  test('GET 404: should give an appropriate error message when given an invalid endpoint', () => {
    return request(app)
    .get('/api/thisisnotanarticle')
    .expect(404)
    .then(({ body }) => {
    expect(body.msg).toBe('Not Found')
     })
  })
})

describe('/api/articles/:article_id/comments' , () => {
  test('GET 200: Responds with an object of the correct topics data for the given article id' , () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
          expect(body.comments).toHaveLength(11)
          body.comments.forEach((comment) => {
             expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
             }) 
          })
    })
  })
  test('GET 200: return the data sorted by the date', () => {
    return request(app)
    .get('/api/articles/1/comments')
    .expect(200)
    .then(({ body }) => {
        expect(body.comments).toHaveLength(11)
        expect(body.comments).toBeSortedBy("created_at", {
            ascending: true, 
            coerce: true,
        })
    })
  })
  test('GET 404: should give an appropriate error message when given an invalid id', () => {
  return request(app)
  .get('/api/articles/100/comments')
  .expect(404)
  .then(({ body }) => {
  expect(body.msg).toBe('There are no comments for this article')
    })
  })
  test('GET 400: should give an appropriate error message when given an invalid id that is not a number', () => {
  return request(app)
  .get('/api/articles/notanid/comments')
  .expect(400)
  .then(({ body }) => {
  expect(body.msg).toBe('Bad Request')
    })
  })
})

describe('/api/articles/:article_id/comments.', () => {
  test('POST 201: Responds with an array of comments from the specified article', () => {

    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: "butter_bridge",
        body: "invoke yourself like a function",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: "butter_bridge",
          body: "invoke yourself like a function",
          article_id: 1,
        });
      })
      
    })
    
    test('GET 400: should give an appropriate error message when given an invalid article id', () => {
      return request(app)
      .get('/api/articles/notanid/comments')
      .expect(400)
      .then(({body}) => {
          expect(body.msg).toBe('Bad Request')
      })
    })
    test('GET 400: Responds with an bad request error message when an no comment is provided', () => {
         return request(app)
        .post("/api/articles/1/comments")
        .send({username: "butter_bridge"})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        })
    })
  })

  describe("/api/articles/:article_id.", () => {
    test("PATCH 200: responds with the updated article when given the article_id and the amount to increment votes by", () => {
      return request(app)
        .patch("/api/articles/1")
        .send( { inc_votes: 2 } )
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: 102,
            article_img_url: expect.any(String),
          })
        })
    })
    test("GET 400: should give an appropriate error message to invalid inc_votes", () => {
      return request(app)
        .patch("/api/articles/2")
        .send( { inc_votes: "hjghi" } )
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request")
        })
    })
  })

  describe("/api/comments/:comment_id", () => {
    test("DELETE 204: should give the code and no body", () => {
      return request(app)
      .delete("/api/comments/1")
      .expect(204)
    })
    test('GET 404: responds with an appropriate status and error message when given a non-existent id', () => {
      return request(app)
        .delete('/api/comments/100')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Comment does not exist")
        })
    })
  })

  describe("GET /api/users", () => {
    test("200: Responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toHaveLength(4)
          body.users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          })
        })
    })
    test('GET 404: should give an appropriate error message when given an invalid endpoint', () => {
      return request(app)
      .get('/api/thisisnotanarticle')
      .expect(404)
      .then(({ body }) => {
      expect(body.msg).toBe('Not Found')
       })
    })
  })