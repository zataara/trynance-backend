"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");



class Assets {
  
  static async getAll(username) {
    try {
    const assets = await db.query(
      `SELECT * 
      FROM assets
      WHERE user_id = $1`,
      [username]
    );
    return res.json({ assets });
  } catch (e) {
    return next(e);
    }
  }
  
}

module.exports = Assets;
