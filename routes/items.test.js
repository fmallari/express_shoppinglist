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
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({item: nike});
    });

    test("Responds with 404 if can't find item", async function() {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});
//end

/** POST /items - create items from data; return { item: item} */

describe("POST /items", function() {
    test("Creates new item to shopping list", async function () {
        const resp = await request(app)
            .post(`/items`)
            .send({
                name: "Nike"
            });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "Nike" }
        });
    });
});
//end

/** PATCH /items/{name} - update item return {item:item} */

describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
        const resp = await request(app)
        .patch(`/items/${nike.name}`)
        .send({
            name: "Jordan"
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "Jordan" }
        });
    });

    test("Responds with 404 if id invalid", async function() {
        const resp = await request(app).patch(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});
//end

/** DELETE /items/[name] - delete item; return {message : "item deleted"} */

describe("DELETE /items/:name", function() {
    test("Deletes a single item", async function() {
        const resp = await request(app).delete(`/items/${nike.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });
    test("Responds with 404 for deleting invalid item", async () => {
        const res = await request(app).delete(`/items/adidas`);
        expect(res.statusCode).toBe(404);
    });
});
