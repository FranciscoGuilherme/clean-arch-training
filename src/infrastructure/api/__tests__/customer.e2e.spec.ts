import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customers")
      .send({
        name: "John",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zip: "12345"
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.city).toBe("City");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
  });

  it("should validate format after customer creation", async () => {
    const response = await request(app)
      .get("/customers")
      .set("Accept", "application/xml")
      .send();

    expect(response.status).toBe(200);
    expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(response.text).toContain(`<customers/>`);
  });
});
