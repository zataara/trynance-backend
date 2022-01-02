"use strict";

const request = require("supertest");

const app = require("../app");

const {_beforeAll, _afterAll, _beforeEach, _afterEach } = 
require('./_testTemplates');

beforeAll(_beforeAll);
afterAll(_afterAll);
beforeEach(_beforeEach);
afterEach(_afterEach);

/***** POST /auth/token *****/

describe("POST /auth/token", () => {
  test("route works", async () => {
    expect.assertions(1);
    const res = await request(app)
      .post("/auth/token")
      .send({
        username: "user1",
        password: "john1234",
      });
      expect(res.body).toEqual({
        "token": expect.any(String)
      });
  });

  test("unauthorized with non-existant user", async () => {
    expect.assertions(1);
    const res = await request(app)
      .post("/auth/token")
      .send( {
        username: "non-existant-user",
        password: "password1234",
      });
      expect(res.statusCode).toEqual(401);
  });

  test("unauthorized with incorrect password", async () => {
    expect.assertions(1)
    const res = await request(app)
      .post("/auth/token")
      .send( {
        username: "user2",
        password: "jane12345",
      });
      expect(res.statusCode).toEqual(401);
  });

  test("bad request with missing data", async () => {
    expect.assertions(1);
    const res = await request(app)
      .post("/auth/token")
      .send( {
        username: "user2",
      });
    expect(res.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async () => {
    expect.assertions(1);
    const res = await request(app)
      .post("/auth/token")
      .send( {
        username: NaN,
        password: "anything",
      });
    expect(res.statusCode).toEqual(400);
  });
});

/***** POST /auth/register *****/