"use strict";

const db = require("../db.js");
const User = require("../models/user");

const { createToken } = require("../helpers/tokens");

async function _BeforeEach() {
  await db.query("BEGIN");
}

async function _AfterEach() {
  await db.query("ROLLBACK");
}

async function _BeforeAll() {
  
  await db.query("DELETE FROM users");

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });


}

async function _AfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  _BeforeAll,
  _BeforeEach,
  _AfterEach,
  _AfterAll,
  u1Token,
  u2Token,
  adminToken,
};
