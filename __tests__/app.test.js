const endpointsJson = require("../endpoints.json");
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const app = require('../app')
const request = require('supertest')


beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api", () => {
  test("GET 200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET /api/topics' , () => {
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

describe('GET /api/articles/:article_id' , () => {
  test('GET 200: should give an correct object corresponding to the id given with a status code of 200' , () => {
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
})

describe('GET /api/articles' , () => {
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