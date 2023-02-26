const request = require("supertest");
const app = require("../app");
require("dotenv").config();
const mongoose = require("mongoose");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U3NzdiMTYyNjdmMjk2MjEyN2ZkNzIiLCJpYXQiOjE2NzY0NjgwMjUsImV4cCI6MTY3OTA2MDAyNX0.-aM_Z5K2erXxXtk1KG7EfhXXgKyklR9GXlKHFLS0n4E";

it("GET all products", async () => {
  const res = await request(app).get("/api/products");
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        brand: expect.any(String),
        price: expect.any(String),
        description: expect.any(String),
        productType: expect.any(String),
        image_link: expect.any(String),
      }),
    ])
  );
});

describe("GET a single product", () => {
  it("200", async () => {
    const res = await request(app).get(
      "/api/products/63ceb4fc1a33d92b37840711"
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "L.A. Lights Cheek & Lip Color",
        brand: "smashbox",
        price: "29.0",
        description:
          "Get the ultimate West Coast glow—in a stick! From Santa Monica to Sunset Boulevard, our latest innovation in illumination is inspired by the magic light of L.A. This multipurpose color for lips and cheeks can be increased from a subtle sheen to a full-on flush. The lightweight, creamy formula looks and feels as natural as your own skin.Want a strobing effect? Try Hollywood & Highlight!Apply to face, lips and/or cheeks for a beautifully illuminated veil of natural color. Blend with the included buffing sponge.",
        productType: "blush",
        image_link:
          "https://www.smashbox.com/media/images/products/388x396/sbx_sku_61630_388x396_0.jpg",
      })
    );
  });

  it("404", async () => {
    const res = await request(app).get("/api/products/1");
    expect(res.statusCode).toBe(404);
  });

  it("400", async () => {
    const res = await request(app).get(
      "/api/products/63ceb4fc1a33d98737840711"
    );
    expect(res.statusCode).toBe(400);
  });
});

describe("POST a new product", () => {
  it("200 product added", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "NewProduct",
        brand: "NewBrand",
        price: "30.0",
        description: "LongDescription",
        productType: "TEST",
        image_link: "--",
      })
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        name: "NewProduct",
        brand: "NewBrand",
        price: "30.0",
        description: "LongDescription",
        productType: "TEST",
        image_link: "--",
      })
    );
  });

  it("401 Authorization token required", async () => {
    const res = await request(app).post("/api/products").send({
      name: "NewProduct",
      brand: "NewBrand",
      price: "30.0",
      description: "LongDescription",
      productType: "NewType",
      image_link: "--",
    });
    expect(res.statusCode).toBe(401);
  });

  it("401 Request is not authorized or  not verified as an admin ", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "NewProduct",
        brand: "NewBrand",
        price: "30.0",
        description: "LongDescription",
        productType: "NewType",
        image_link: "--",
      })
      .set("authorization", `Bearer ghhytxsawetyuhnnmk`);
    expect(res.statusCode).toBe(401);
  });

  it("not validate", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Product",
        brand: "",
        price: "",
        description: "LongDescription",
        productType: "",
        image_link: "",
      })
      .set("authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        error: expect.arrayContaining([
          '"brand" is not allowed to be empty',
          '"price" is not allowed to be empty',
          '"productType" is not allowed to be empty',
          '"image_link" is not allowed to be empty',
        ]),
      })
    );
  });
});

it("UPDATE a product ", async () => {
  const res = await request(app)
    .patch("/api/products/63fb3968bd4bf79cc3fe8266")
    .send({
      name: "ModiProduct",
      brand: "ModiBrand",
      price: "30.0",
      description: "LongDescription",
      productType: "ModiType",
      image_link: "--",
    })
    .set("authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(res.body.name).toBe("toedit");
});

it("DELETE a product", async () => {
  const res = await request(app)
    .delete("/api/products/63fb3946bd4bf79cc3fe8261")
    .set("authorization", `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
});
