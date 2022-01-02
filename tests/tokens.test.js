"use strict" 

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { createToken } = require("../helpers/tokens");

describe("create a token", () => {
  test("function works", () => {
    const token = createToken({ username: "test_user" });
    const payload = jwt.verify(token, SECRET_KEY);
    expect(payload).toEqual({
      iat: expect.any(Number),
      username: "test_user",
    });
  });

})