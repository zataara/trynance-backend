const request = require("supertest");

const app = require("./app");
const db = require("./db");

afterAll(() => db.end())

describe("Testing App functionality", () => {
  test("not found for a missing/404", async function () {
    const res = await request(app).get("/not-a-route");
    expect(res.statusCode).toEqual(404);
  });
});
