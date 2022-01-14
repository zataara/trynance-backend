"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Faves {
  static async get(username) {
    //get a list of all the faves.
    const faves = await db.query(
      `SELECT user_id AS "username", symbol
      FROM faves
      WHERE user_id = $1 
      `,
      [username]
    );
    return JSON.stringify(faves.rows);
  }

  //post a new fave
  static async post(username, symbol) {
    try {
      const newFave = await db.query(
        `INSERT INTO faves
            (symbol,
              user_id)
              VALUES ($1, $2)
              RETURNING user_id AS "username, symbol"`,
        [symbol, username]
      );
      console.log(JSON.stringify(newFave.rows[0]))
      return JSON.stringify(newFave.rows[0]);
    } catch (e) {
      return e.stack;
    }
  }

  // delete a fave
  static async delete(username, symbol) {
    try {
      await db.query(
        `DELETE
            FROM faves
            WHERE user_id = $1
            AND  symbol = $2`,
        [username, symbol]
      );
      console.log(JSON.stringify({ deleted: symbol }));
      return JSON.stringify({ deleted: symbol });
    } catch (e) {
      return e.stack;
    }
  }
}

module.exports = Faves;
