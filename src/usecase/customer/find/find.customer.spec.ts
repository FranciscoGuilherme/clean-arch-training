import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/costumer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/costumer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository)
    const customer = new Customer("123", "John");
    const address = new Address("Street", 123, "11111111", "City");
    customer.address = address;
    await customerRepository.create(customer);

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "Street",
        number: 123,
        zip: "11111111",
        city: "City"
      }
    }

    const result = useCase.execute(input);
    expect(result).toEqual(output);
  });
});
