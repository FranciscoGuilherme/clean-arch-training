import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should calculate total of all orders", () => {
    const item1 = new OrderItem("oi1", "pencil", 5, "p1", 2);
    const item2 = new OrderItem("oi2", "mouse", 30, "p2", 2);
    const item3 = new OrderItem("oi3", "keyboard", 100, "p3", 1);
    const order1 = new Order("o1", "c1", [item1, item2]);
    const order2 = new Order("o1", "c1", [item3]);

    const total = OrderService.totalOrderPrice([order1, order2]);

    expect(total).toBe(170);
  });

  it("should place an order", () => {
    const customer = new Customer("c1", "Customer 1");
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);
    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
