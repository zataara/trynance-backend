"use strict"


const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");
const jsonschema = require("jsonschema");


const User = require("../models/user");


router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema);
    if(!validator.valid) {
      const errors = validator.errors.map(e=> e.stack);
      throw new BadRequstError(errors);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    returnres.json({ token })
  } catch (e) {
    return next(e)
  }
});


router.post("/register", async function (req, res, next) {
  try {
    const validator = jsonscheme.validate(req.body, 
      userRegisterSchema);
      if(!validator.valid) {
        const errors = validator.errors.map(e=> e.stack);
        throw new BadRequestError(errors)
      }
      const newUser = await User.register({ ...req.body });
      const token = createToken(newUser);
      return res.status(201).json({ token })
  } catch(e) {
    return next (e);
  }
});

module.exports = router;
