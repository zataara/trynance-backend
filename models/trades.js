"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");



class Trades {
  
  static async getAll(username) {
    try {
    const trades = await db.query(
      `SELECT * 
      FROM trades
      WHERE user_id = $1`,
      [username]
    );
    return res.json({ trades });
  } catch (e) {
    return next(e);
  }
}
  static async postTrade(username, cfa, cf, cta, ct,dt) {
    try {
      const assets = await db.query(
        `INSERT INTO trades
        (username,
        currency_from_amount,
        currency_from,
        currency_to_amount,
        currency_to,
        datetime)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING username, currency_from_amount AS "currencyFromAmount", currency_from AS "currency_from", currency_to_amount AS "currencyToAmount", currency_to AS "currencyTo", datetime`,
        [username, cfa, cf, cta, ct, dt]);

        return res.json({ assets });
    } catch(e) {
        return next(e)
    }
  }
  
  
}

module.exports = Trades;
