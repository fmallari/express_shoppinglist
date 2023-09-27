process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb")

let nike = { name: "Nike" };

beforeEach(function() {
    items.push(nike);
});

afterEach(function() {
    items = []
});
// end afterEach

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function() {
    test("Gets a shopping list", async function() {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items: [nike]});
    });
});
//end
/**GET /items/[name] - returns data about one item */

describe("GET /items/:name", function() {
    test("Gets a single item", async function() {
        const resp = await request(app).get(`/items/${nike.name}`);
        expect(resp,statusCode).toBe(200);

        expect(resp.body).toEqual({item: nike});
    });
});
//end