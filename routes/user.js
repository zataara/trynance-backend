"use stric";

const express = require("express");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const Trades = require("../models/trades");
const Assets = require("../models/assets");
const Faves = require("../models/faves");

const { createToken } = require("../helpers/tokens");
const jsonschema = require("jsonschema");
const userNewSchema = require("../schemas/userNew.json");

const router = express.Router();

router.get(
  "/:username",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/:username/assets",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Assets.getAll(req.params.username);
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/:username/trades",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Trades.getAll(req.params.username);
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/trades/:cfa/:cf/:cta/:ct/:dt",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Trades.postTrade(
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

router.get(
  "/:username/faves",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return res.json(Faves.getAll(req.params.username));
    } catch (e) {
      return next(e);
    }
  }
);

router.post(
  "/:username/faves/:fave",
  ensureCorrectUserOrAdmin,
  async function (req, res, next) {
    try {
      return Faves.postFave(req.params.username, req.params.fave);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
