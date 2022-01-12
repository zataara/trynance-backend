"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");


class Trades {
  static async getAll(username) {
    const trades = await db.query(
      `SELECT * 
        FROM trades
        WHERE user_id = $1`,
      [username]
    );
    return JSON.stringify(trades.rows);
  }
  static async post(username, cfa, cf, cta, ct, dt) {
    // Insert the new trade into the trades table
    const newTrade = await db.query(
      `INSERT INTO trades
        (user_id,
        currency_from_amount,
        currency_from,
        currency_to_amount,
        currency_to,
        datetime)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id AS username, currency_from_amount AS "currencyFromAmount", currency_from AS "currencyFrom", currency_to_amount AS "currencyToAmount", currency_to AS "currencyTo", datetime`,
      [username, cfa, cf, cta, ct, dt]
    );
    

    // Select the amount of a certain asset a user has and update the new asset amount after trade
    const assetsFrom = await db.query(
      `SELECT * 
          FROM assets
          WHERE symbol = $1
          AND user_id = $2`,
      [cf, username]
    );
    if(assetsFrom.rows[0] === undefined) {
      return JSON.stringify({status: "failed: insufficient funds"})
    }
    if(assetsFrom.rows[0]['amount']){
    let newAmount = assetsFrom.rows[0]['amount'] - cfa;

    if(newAmount < 0) {
      return JSON.stringify({status: "failed: insufficient funds"})
    }
    console.log(newAmount, cf, username);
    let updated = await db.query(
      `UPDATE assets
          SET amount = $1
          WHERE symbol = $2
          AND user_id = $3
          RETURNING symbol, user_id AS "username", amount`,
      [newAmount, cf, username]
    );
    console.log(updated.rows[0]);
    } else {
      return JSON.stringify({status: "failed: insufficient funds"})
    }

    //check to see if the user already has some of the asset that they are exchanging to, if so update the new amount, if not create a new row with the new asset.
    const assetsTo = await db.query(
      `SELECT * 
          FROM assets
          WHERE symbol = $1
          AND user_id = $2`,
      [ct, username]
    );
    if (assetsTo.rows[0]) {
      const currentAssetAmountTo = 
        JSON.stringify(assetsTo.rows[0]["amount"]
      );
      await db.query(
        `UPDATE assets
            SET amount = $1
            WHERE symbol = $2
            AND user_id = $3`,
        [currentAssetAmountTo + cta, ct, username]
      );
    } else {
      await db.query(
        `INSERT INTO assets
            (
              symbol,
              user_id,
              amount
            )
            VALUES ($1, $2, $3)
            RETURNING symbol, user_id AS "username", amount
            `,
        [ct, username, cta]
      );
    }
  }
}

module.exports = Trades;
