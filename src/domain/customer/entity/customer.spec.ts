import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw Error when id is empty", () => {
    expect(() => {
      const customer = new Customer("", "Francisco");
    }).toThrowError("customer: Id is required");
  });

  it("should throw Error when name is empty", () => {
    expect(() => {
      const customer = new Customer("123", "");
    }).toThrowError("customer: Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("123", "Francisco");
    customer.changeName("Guilherme");
    expect(customer.name).toBe("Guilherme");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();
  });

  it("should throw error when trying to activate customer", () => {
    expect(() => {
      const customer = new Customer("123", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to active a customer");
  });

  it("should activate customer", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBeTruthy();

    customer.deactivate();

    expect(customer.isActive()).toBeFalsy();
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    const rewards = [
      {reward: 10, totalReward: 10},
      {reward: 20, totalReward: 30},
      {reward: 30, totalReward: 60}
    ];

    rewards.forEach(reward => {
      customer.addRewardPoints(reward.reward);
      expect(customer.rewardPoints).toBe(reward.totalReward);
    });
  });
});
