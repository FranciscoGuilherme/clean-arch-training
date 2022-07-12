import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zip: entity.address.zip,
      city: entity.address.city,
      active: entity.active,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zip: entity.address.zip,
        city: entity.address.city,
        active: entity.active,
        rewardPoints: entity.rewardPoints
      },
      { where : { id: entity.id } }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );
    customer.address = address;

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customersFound = await CustomerModel.findAll();
    let customers = customersFound.map((customerFound) => {
      const customer = new Customer(customerFound.id, customerFound.name);
      const address = new Address(
        customerFound.street,
        customerFound.number,
        customerFound.zip,
        customerFound.city
      );

      customer.address = address;

      return customer;
    });

    return customers;
  }
}
