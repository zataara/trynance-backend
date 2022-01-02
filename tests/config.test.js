"use strict";

describe("configurations come from environment", () => {
  test("data works correclty", () => {
    process.env.NODE_ENV = "test_env";
    process.env.SECRET_KEY = "test_secret_key";
    process.env.PORT = "3333";
    process.env.DATABASE_URL = "test-url";

    const config = require("../config");
    expect(config.SECRET_KEY).toEqual("test_secret_key");
    expect(config.PORT).toEqual(3333);
    expect(config.getDatabaseUri()).toEqual("test-url");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;

    expect(config.getDatabaseUri()).toEqual("trynance");
    process.env.NODE_ENV = "test";

    expect(config.getDatabaseUri()).toEqual("trynance-test");
  });
});
