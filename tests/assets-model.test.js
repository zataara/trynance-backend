"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Assets = require("../models/assets.js");
const Trades = require("../models/trades.js");
const {
  _BeforeAll,
  _BeforeEach,
  _AfterEach,
  _AfterAll,
} = require("./_testModelTemplates");

beforeAll(_BeforeAll);
beforeEach(_BeforeEach);
afterEach(_AfterEach);
afterAll(_AfterAll);

/***** Testing Get All Assets *****/

describe("Get All Assets", function () {
  let username = "u1";
  test("returns correct data", async function () {
    let assets = await Assets.get(username);
    expect(assets).toContain("eth");
    expect(assets).toContain("btc");
    expect(assets).toContain("xrp");
  });

  test("returns correct data after a trade", async function() {
    await Trades.post("u1", 100, "xrp", 1, "bnb", "time");
    let assets = await Assets.get(username)
    expect(assets).toContain("bnb");


  })
});
