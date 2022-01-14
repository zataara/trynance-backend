"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Trades = require("../models/trades.js");
const Assets = require("../models/assets.js");
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

const username = "u1";

describe("Trades are operating correctly", function () {
  test("returns correct data", async function () {
    let trades = await Trades.get(username);
    expect(trades).toContain("eth");
    expect(trades).toContain("btc");
    expect(trades).toContain("xrp");
  });
});

describe("assets are updating correctly with trade acivity", function () {
  test("trade creates new asset", async function () {
    await Trades.post(username, 1, "eth", 1, "ltc", "time");

    let assets = await Assets.get(username);
    expect(assets).toContain(`"symbol":"ltc","user_id":"u1","amount":1`);
    expect(assets).toContain(`"symbol":"eth","user_id":"u1","amount":0`);

    await Trades.post(username, 1, "ltc", 2, "sol", "time");
    let assets2 = await Assets.get(username);
    expect(assets2).toContain(`"symbol":"ltc","user_id":"u1","amount":0`);
    expect(assets2).toContain(`"symbol":"sol","user_id":"u1","amount":2`);
  });

  test("fails if insufficient funds", async function () {
    let res = await Trades.post(username, 1, "amc", 2, "ltc", "time");

    expect(res).toContain(`"status":"Failed: insufficient funds"`);
  });
});
