"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Assets {
  static async get(username) {
    const assets = await db.query(
      `SELECT * 
      FROM assets
      WHERE user_id = $1`,
      [username]
    );
    console.log( assets.rows)
    return JSON.stringify( assets.rows );
  }
}

module.exports = Assets;
