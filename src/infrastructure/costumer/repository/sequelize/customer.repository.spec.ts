import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'memory',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street", 10, "02343-098", "City");
    customer.address = address;

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1",
      street: "Street",
      number: 10,
      zip: "02343-098",
      city: "City",
      active: false,
      rewardPoints: 0
    })
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street", 10, "02343-098", "City");
    customer.address = address;

    await customerRepository.create(customer);
    let customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1",
      street: "Street",
      number: 10,
      zip: "02343-098",
      city: "City",
      active: false,
      rewardPoints: 0
    });

    customer.activate();
    customer.changeName("Customer 1 New");
    customer.addRewardPoints(100);
    await customerRepository.update(customer);
    customerModel = await CustomerModel.findOne({ where: { id: "c1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "c1",
      name: "Customer 1 New",
      street: "Street",
      number: 10,
      zip: "02343-098",
      city: "City",
      active: true,
      rewardPoints: 100
    });
  });

  it("should find a user by ID", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("c1", "Customer 1");
    const address = new Address("Street", 10, "02343-098", "City");
    customer.address = address;

    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "c1" } });
    const customerFound = await customerRepository.find(customer.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerFound.id,
      name: customerFound.name,
      street: customerFound.address.street,
      number: customerFound.address.number,
      zip: customerFound.address.zip,
      city: customerFound.address.city,
      active: customerFound.active,
      rewardPoints: customerFound.rewardPoints
    })
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customers = [
      new Customer("c1", "Customer 1"),
      new Customer("c2", "Customer 2"),
      new Customer("c3", "Customer 3")
    ];
    
    customers.forEach(async customer => {
      customer.address = new Address("Street", 10, "00000-000", "City");
      await customerRepository.create(customer);
    });

    const customersFound = await customerRepository.findAll();

    expect(customers).toEqual(customersFound);
  });

  it("should throw error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });
});
