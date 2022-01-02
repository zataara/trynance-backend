"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");

const { SECRET_KEY } = require("../config");
const testJWT = jwt.sign({ username: "test" }, SECRET_KEY);
const badJWT = jwt.sign({ username: "test" }, "wrong-key");

describe("authentication works", () => {
  test("works via header", () => {
    expect.assertions(2);
    const req = { headers: { authorization: `Bearer ${testJWT}` } };
    const res = { locals: {} };
    const next = (error) => {
      expect(error).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
      },
    });
  });

  test("works without header", () => {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = (error) => {
      expect(error).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });

  test("works with invalid token", () => {
    expect.assertions(2);
    const req = {
      headers: {
        authorization: `Bearer ${badJWT}`,
      }
    };
    const res = { locals: {} };
    const next = (error) => {
      expect(error).toBeTruthy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});

describe("ensureLoggedIn", () => {
  test("functions properly", () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test"}}};
    const next = (error) => {
      expect(error).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", () => {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = (error) => {
      expect(error instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});
