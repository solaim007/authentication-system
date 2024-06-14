const request = require('supertest');
const expect = require('chai').expect;
const app = require('../index'); // your express app

describe('API Endpoints', () => {
  describe('GET /api/data', () => {
    it('should return all data', (done) => {
      request(app)
        .get('/api/data')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /api/data', () => {
    it('should create new data', (done) => {
      const data = { name: 'Test data' };
      request(app)
        .post('/api/data')
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body.name).to.equal(data.name);
          done();
        });
    });
  });

  // Add more tests for other API endpoints as needed
});