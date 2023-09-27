process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");

let items = require("./fakeDb")

let item = {name: "Nike", price:200 }

beforeEach(async () => {
    items.push(item)
});

afterEach(async () => {
    items = []
});