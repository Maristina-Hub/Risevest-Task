import supertest from 'supertest';

import app from '../server.js';
import * as dbHandler from '../utils/test_db.js';
import userHandler from '../utils/userSamples.js';

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.disconnectDB());

// ========>>> R E G U L A R   U S E R   R E G I S T R A T I O N
describe("POST /register", () => {
  describe("Evaluations for when request is successful", () => {
    it("when registration succeeds",  () => {
                return request.post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual("success");
      expect(response.body.message).toEqual("successful");
      expect(response.body.data).toHaveProperty("fullname");
    })
  })

  describe("Evaluations for when request fails", () => {
    it("when required fields aren't filled",  () => {
                return request.post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.incompleteInfo);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual('Please fill all fields');
    })

    it("when user Email already exists in the db",  () => {
        // Trying to register again with same email
                return request.post('/register')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fullDetails);

      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual("fail");
      expect(response.body.message).toEqual("User already exists");
    })
  })
})


//========>>> L O G I N
describe("POST /login", () => {
  describe("Evaluations for when LOGIN is successful", () => {
    it("when user login succeeds", () => {
      // Login attempt on creating account
      return request.post('/login')
                    .set('Content-Type', 'application/json')
                    .send(userHandler.loginDetails);
          

      expect(response.statusCode).toEqual(200);
      expect(response.body.status).toEqual("Success");
      expect(response.body.message).toEqual("Logged in successfully");
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.token).toMatch("Bearer");
    })
  })

  describe("Evaluations for when LOGIN fails", () => {
    it("when required fields aren't filled", () => {
      // Login attempt on creating account
                return request.post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.incompleteLoginInfo)
      
      expect(response.statusCode).toEqual(400);
      expect(response.body.status).toEqual("Failed");
      expect(response.body.message).toEqual("Enter your email and password!");
    })


    it("when given email doesn't exist in db", () => {
                return request.post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.loginDetails);

      expect(response.statusCode).toEqual(404);
      expect(response.body.status).toEqual("Failed");
      expect(response.body.message).toEqual("Record not found");
    })


    it("when given password doesn't match user's in the db", () => {
      // Login attempt with different password
                return request.post('/login')
                              .set('Content-Type', 'application/json')
                              .send(userHandler.fakeLoginPassword);

      expect(loginResponse.statusCode).toEqual(404);
      expect(loginResponse.body.status).toEqual("Failed");
      expect(loginResponse.body.message).toEqual("Email or password incorrect");
    })
  })
})


