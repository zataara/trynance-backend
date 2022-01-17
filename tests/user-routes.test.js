"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const{
  _BeforeAll,
  _BeforeEach,
  _AfterEach,
  _AfterAll,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testModelTemplates.js");

beforeAll(_BeforeAll);
beforeEach(_BeforeEach);
afterEach(_AfterEach);
afterAll(_AfterAll);


/***** Faves *****/

describe("GET /:username/faves", function () {
  test("words for user", async function () {
    const res = await request(app)
      .get(`/u1/faves`)
    expect(res.body).toEqual({

    })
  })
})
