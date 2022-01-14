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
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");

/*** Schemas ***/
const jsonschema = require("jsonschema");
const newUserSchema = require("../schemas/userNew");
const userAuthSchema = require("../schemas/userAuth");
const tradeSchema = require("../schemas/trades");
const favesSchema = require("../schemas/faves");
const assetsSchema = require("../schemas/assets");


const router = express.Router();

/***** User Routes *****/

router.get(
  "/:username",
  // ensureCorrectUserOrAdmin,
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
  // ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Assets.getAll(req.params.username);
    } catch (e) {
      return next(e);
    }
  }
);

/***** Trade Routes *****/

router.get(
  "/:username/trades",
  // ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Trades.get(req.params.username);
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/trades/:cfa/:cf/:cta/:ct/:dt",
  // ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Trades.post(
        req.params.username,
        req.params.cfa,
        ret.params.cd,
        req.params.cta,
        req.params.ct,
        req.params.dt
      );
    } catch (e) {
      return next(e);
    }
  }
);

/***** Fave Routes *****/

router.get(
  "/:username/faves",
  // ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return res.json(Faves.get(req.params.username));
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/faves/:fave",
  // ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Faves.post(req.params.username, req.params.fave);
    } catch (e) {
      return next(e);
    }
  }
);

router.delete(
  "/:username/faves/:fave",
  // esnureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Faves.delete(req.params.username, req.params.fave);
    } catch (e){
      return next(e)
    }
  }
);

module.exports = router;
