const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

async function _BeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(
    `
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query("DELETE FROM assets");

  await db.query(
    `INSERT INTO assets(symbol,
                          user_id,
                          amount)
        VALUES('btc', 'u1', 1),
              ('eth', 'u1', 1),
              ('xrp', 'u1', 200)               
        `
  );

  await db.query("DELETE FROM trades");

  await db.query(
    `INSERT INTO trades(
                          user_id,
                          currency_from_amount,
                          currency_from,
                          currency_to_amount,
                          currency_to,
                          datetime)
        VALUES('u1', 1, 'btc', 1, 'eth', 
        'time'),
              ('u1', 1, 'eth', 1, 'sol', 'time'),
              ('u1', 200, 'xrp', 200, 'xlm', 'time')               
        `
  );

  await db.query("DELETE FROM faves");

  await db.query(
    `INSERT INTO faves(
                        symbol,
                        user_id
                          )
        VALUES('btc', 'u1'),
              ('eth', 'u1'),
              ('xlm', 'u1')               
        `
  );
}

async function _BeforeEach() {
  await db.query("BEGIN");
}

async function _AfterEach() {
  await db.query("ROLLBACK");
}

async function _AfterAll() {
  await db.end();
}

module.exports = {
  _BeforeAll,
  _BeforeEach,
  _AfterEach,
  _AfterAll,
};
