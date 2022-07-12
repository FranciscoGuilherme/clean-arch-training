import OrderItem from "./order_item";

describe("Order item unit tests", () => {
  it("should throw error when price is lower or equal to zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 0, "p1", 1);
    }).toThrowError("Price is required");
  });
});
