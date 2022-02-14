import supertest from 'supertest';
import app from '../server.js';

const request = supertest(app);

describe('GET /', () => {
it('get route', () => {
  return request.get('/')
                                expect(response.status).toEqual(200);;
                                expect(response.body.message).toEqual("Welcome to Rise Vest App.");
                                
                                });
                              });




