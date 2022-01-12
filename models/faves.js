"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Faves {
  static async getAll(username) {
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

  //toggle whether a crypto is in a users watchlist, if its already a fave, delete it. If it is not a fave, add it to faves.
  static async post(username, symbol) {
    const faves = await db.query(
      `SELECT *
        FROM faves
        WHERE user_id = $1
        AND symbol = $2`,
      [username, symbol]
    );

    if (faves.rows[0]) {
      console.log("fave found", faves.rows[0]);
      await db.query(
        `DELETE
            FROM faves
            WHERE user_id = $1
            AND  symbol = $2`,
        [username, symbol]
      );
      console.log(JSON.stringify({ deleted: symbol }));
      return JSON.stringify({ deleted: symbol });
    } else {
      console.log("fave not found");
      console.log({username}, symbol);
      try {
        const markFave = await db.query(
          `INSERT INTO faves
            (symbol,
              user_id)
              VALUES ($1, $2)
              RETURNING user_id AS "username, symbol"`,
          [symbol, username]
        )
      console.log("new record created", markFave.rows[0]);
      return JSON.stringify( markFave.rows[0] );
      } catch (e) {
        return e.stack;
      }
    }
  }
}

module.exports = Faves;
