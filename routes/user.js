"use stric";

const express = require("express");
const {ensureLoggedIn} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("./helpers/tokens");
const jsonschema = require("jsonschema");
const userNewSchema = require("../schemas/userNew.json");

const router = express.Router();



router.get("./:username", ensureLoggedIn, async function(req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (e) {
    return next(e);
  }
});