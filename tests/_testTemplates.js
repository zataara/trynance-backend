"use strict"

const db = require("../db.js");
const bcrypt = require("bcrypt");

const { BCRYPT_WORK_FACTOR } = require("../config");


async function _beforeEach() {
  await db.query("BEGIN");
}

async function _afterEach() {
  await db.query("ROLLBACK");
}

async function _beforeAll() {
  await db.query("DELETE from users");

  await db.query(`
              INSERT INTO users(username,
                                password,
                                first_name,
                                last_name,
                                email)
              VALUES ('user1', $1, 'John', 'Doe', 'john@doe.com'),
                      ('user2', $2, 'Jane', 'Doe', 'jane@doe.com')
              RETURNING username`,
              [await bcrypt.hash("john1234", BCRYPT_WORK_FACTOR),
              await bcrypt.hash("jane1234", BCRYPT_WORK_FACTOR)]);
}

async function _afterAll() {
  await db.end();
}


module.exports = { _beforeEach, _afterEach, _beforeAll, _afterAll }