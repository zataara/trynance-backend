"use strict";

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";

const PORT = +process.env.PORT || 3003;

function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "trynance-test"
    : process.env.DATABASE_URL || "trynance";
}

//Lower bcrypt's work factor during test and raise during production.
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("------------------------------");
console.log("Tryance Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".blue, getDatabaseUri());
console.log("------------------------------")


module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
}