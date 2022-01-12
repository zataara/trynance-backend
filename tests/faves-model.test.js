"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const Faves = require("../models/faves.js");
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
let username = "u1";

describe("Get All Faves", function () {
  test("returns correct data", async function () {
    let faves = await Faves.getAll(username);
    expect(faves).toContain("eth");
    expect(faves).toContain("btc");
    expect(faves).toContain("xlm");
  });
});

describe("Updates faves", function () {
  test("create new fave if not faved before", async function () {
    await Faves.post(username, "xrp");
    let faves = await Faves.getAll(username);
    expect(faves).toContain("xrp");
  });

  test("toggles faves off if already faved", async function () {
    await Faves.post(username, "xlm");
    let faves = await Faves.getAll(username);
    expect(faves).not.toContain("xlm");
  });
});
