"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Assets {
  static async getAll(username) {
    const assets = await db.query(
      `SELECT * 
      FROM assets
      WHERE user_id = $1`,
      [username]
    );
    return JSON.stringify( assets.rows );
  }
}

module.exports = Assets;
