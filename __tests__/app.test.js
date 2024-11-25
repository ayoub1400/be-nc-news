const endpointsJson = require("../endpoints.json");
const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data')
const app = require('../app')
const request = require('supertest')


beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET /api/topics' , () => {
  test('200: Responds with an object of all of the correct topics data' , () => {
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