"use stric";

const express = require("express");

/*** Errors ***/
const { BadRequestError } = require("../expressError");

/*** Models ***/
const User = require("../models/user");
const Trades = require("../models/trades");
const Assets = require("../models/assets");
const Faves = require("../models/faves");

/*** Auth ***/
const { ensureCorrectUser } = require("../middleware/auth");

/*** Schema ***/
const tradeSchema = require("../schemas/trades.json");

const router = express.Router();

/***** User Routes *****/

router.get(
  "/:username",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (e) {
      return next(e);
    }
  }
);

/***** Asset Routes *****/

router.get(
  "/:username/assets",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Assets.get(req.params.username);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

/***** Trade Routes *****/

router.get(
  "/:username/trades",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Trades.get(req.params.username);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/trades",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Trades.post(req.body);
      console.log(response)
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

/***** Fave Routes *****/

router.get(
  "/:username/faves",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Faves.get(req.params.username);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/faves/:fave",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Faves.post(req.params.username, req.params.fave);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/:username/faves/:fave",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const response = await Faves.delete(req.params.username, req.params.fave);
      return res.json(response);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
