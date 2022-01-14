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
    let faves = await Faves.get(username);
    expect(faves).toContain("eth");
    expect(faves).toContain("btc");
    expect(faves).toContain("xlm");
  });
});

describe("Updates faves", function () {
  test("create new fave if not faved before", async function () {
    await Faves.post(username, "xrp");
    let faves = await Faves.get(username);
    expect(faves).toContain("xrp");
  });

  test("toggles faves off if already faved", async function () {
    let faves = await Faves.get(username);
    expect(faves).toContain("xlm");
    await Faves.delete(username, "xlm");
    faves = await Faves.get(username);
    expect(faves).not.toContain("xlm");
  });

  test("toggles fave back on after being unfaved", async function () {
    await Faves.post(username, "xlm");
    let faves = await Faves.get(username);
    expect(faves).toContain("xlm");
  });

  test("toggles faves off again already faved", async function () {
    await Faves.delete(username, "xlm");
    let faves = await Faves.get(username);
    expect(faves).not.toContain("xlm");
  });


  test("toggles faves back on after previously being a fav and deleted", async function () {
    await Faves.post(username, "shib");
    let faves = await Faves.get(username);
    expect(faves).toContain("shib");
    await Faves.delete(username, "shib");
    faves = await Faves.get(username);
    expect(faves).not.toContain("shib");
    await Faves.post(username, "shib");
    faves = await Faves.get(username);
    expect(faves).toContain("shib");
    await Faves.delete(username, "shib");
    faves = await Faves.get(username);
    expect(faves).not.toContain("shib");
  });
});
