"use strict"

const { NotFoundError, BadRequestError, UnauthorizedError, } = require("../expressError");
const db = require("../db.js");
const User = require("../models/user");
const { _beforeEach, _afterEach, _beforeAll, _afterAll} = require("./_testTemplates");

beforeAll(_beforeAll);
beforeEach(_beforeEach);
afterEach(_afterEach);
afterAll(_afterAll);


/*** Tesing User Registration ***/

describe("Registering a new user", () => {
  const newUser = {
    username: "test-user1",
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
  };

  test("registration", async () => {
    let currentUser = await User.register({
      ...newUser,
      password: "john1234",
    });
    expect(currentUser).toEqual(newUser);

    const findUser = await db.query(`SELECT *
                                    FROM users
                                    WHERE username = 'test-user1'`);
    expect(findUser.rows.length).toEqual(1);
    expect(findUser.rows[0].password.startsWith('$2b$')).toEqual(true);
  });

  test("get a BadRequestError with duplicate data", async () => {
    try{
      await User.register({
        ...newUser,
        password: "john1234",
      });

      await User.register({
        ...newUser,
        password: "john1234",
      });
      fail();
    } catch(e) {
      expect(e instanceof BadRequestError).toBeTruthy();
    }
  });
});