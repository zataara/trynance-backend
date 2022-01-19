"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Trades {
  static async get(username) {
    const trades = await db.query(
      `SELECT *
        FROM trades
        WHERE user_id = $1`,
      [username]
    );
    return JSON.stringify(trades.rows);
  }
  static async post({ data }) {
    let {
      username,
      currency_from_amount,
      currency_from_price,
      currency_from_image,
      currency_from,
      currency_to_amount,
      currency_to_price,
      currency_to_image,
      currency_to,
      date,
    } = data;
    console.log(data);

    // First select the amount of a certain asset a user has and update the new asset amount after trade. If there is not enough of the currency_from_amount, trade will fail.
    const assetsFrom = await db.query(
      `SELECT * 
          FROM assets
          WHERE symbol = $1
          AND user_id = $2`,
      [currency_from, username]
    );

    if (
      assetsFrom.rows[0] === undefined ||
      assetsFrom.rows[0]["amount"] - currency_from_amount < 0
    ) {
      return JSON.stringify({ status: "Failed: insufficient funds" });
    }

    //initiate making a trade
    try {
      const newTrade = await db.query(
        `INSERT INTO trades
          (user_id,
          currency_from_amount,
          currency_from_price,
          currency_from_image,
          currency_from,
          currency_to_amount,
          currency_to_price,
          currency_to_image,
          currency_to,
          date)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING user_id AS username, currency_from_amount AS "currencyFromAmount", currency_from_price AS "currencyFromPrice", currency_from_image AS "currencyFromImage", currency_from AS "currencyFrom", currency_to_amount AS "currencyToAmount", currency_to_price AS "currencyToPrice", currency_to_image AS "currencyToImage", currency_to AS "currencyTo", date`,
        [
          username,
          currency_from_amount,
          currency_from_price,
          currency_from_image,
          currency_from,
          currency_to_amount,
          currency_to_price,
          currency_to_image,
          currency_to,
          date,
        ]
      );
      console.log("New Trade Inserted", newTrade.rows[0]);

      const newAmount = assetsFrom.rows[0]["amount"] - currency_from_amount;
      let updatedAsset = await db.query(
        `UPDATE assets
            SET amount = $1
            WHERE symbol = $2
            AND user_id = $3
            RETURNING symbol, user_id AS "username", amount`,
        [newAmount, currency_from, username]
      );
      console.log("Currency From Amount Updated:", updatedAsset.rows[0]);

      //check to see if the user already has some of the asset that they are exchanging to, if so update the new amount, if not create a new row with the new asset.
      const assetsTo = await db.query(
        `SELECT * 
          FROM assets
          WHERE symbol = $1
          AND user_id = $2`,
        [currency_to, username]
      );
      if (assetsTo.rows[0]) {
        const currentAssetAmountTo = assetsTo.rows[0]["amount"];
        console.log(currentAssetAmountTo);
        const updatedAsset = await db.query(
          `UPDATE assets
            SET amount = $1
            WHERE symbol = $2
            AND user_id = $3
            RETURNING symbol, amount`,
          [currentAssetAmountTo + currency_to_amount, currency_to, username]
        );
        console.log("Currency To Amount Updated", updatedAsset.rows[0]);
      } else {
        console.log("hereeeee")
        const newAsset = await db.query(
          `INSERT INTO assets
            (symbol,
              user_id,
              amount,
              image,
              name
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING symbol, user_id AS "username", amount
            `,
          [currency_to, username, currency_to_amount, currency_to_image, currency_to]
        );
        console.log("Currency To Amount Created", newAsset.rows[0]);
      }
    } catch (e) {
      console.log({ Status: "Failed" });
      console.log(e.stack);
      return e.stack;
    }
  }
}

module.exports = Trades;
