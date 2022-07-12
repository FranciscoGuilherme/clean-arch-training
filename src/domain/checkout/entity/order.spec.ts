import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw Error when Id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw Error when Id is empty", () => {
    expect(() => {
      let order = new Order("123", "123", []);
    }).toThrowError("Items quantity must be greater than 0");
  });

  it("should create a order with success", () => {
    const item = new OrderItem("i1", "Item 1", 10, "p1", 2);
    expect(item.validate()).toBeTruthy();
  });

  it("should calculate total", () => {
    let item1 = new OrderItem("i1", "Item 1", 100, "p1", 1);
    let order = new Order("123", "123", [item1]);
    let total = order.total();

    expect(total).toBe(100);

    item1 = new OrderItem("i1", "Item 1", 100, "p1", 2);
    let item2 = new OrderItem("i2", "Item 2", 100, "p2", 2);
    order = new Order("123", "123", [item1, item2]);
    total = order.total();

    expect(total).toBe(400);
  });

  it("should throw error if the quantity is less or equal zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 20, "p1", 0);
      const order = new Order("123", "Customer 1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
