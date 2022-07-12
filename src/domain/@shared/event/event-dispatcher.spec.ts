import Customer from "../../customer/entity/customer";
import CustomerChangeAddressEvent from "../../customer/events/customer-change-address.event";
import CustomerCreatedEvent from "../../customer/events/customer-created.event";
import Log1WhenCustomerIsCreatedHandler from "../../customer/events/handlers/log-1-when-customer-is-created.handler";
import Log2WhenCustomerIsCreatedHandler from "../../customer/events/handlers/log-2-when-customer-is-created.handler";
import LogWhenCustomerChangeAddressHandler from "../../customer/events/handlers/log-when-customer-change-address.handler";
import Address from "../../customer/value-object/address";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handlers/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"].pop()
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all events", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});

describe("Domain event customer tests", () => {
  it("should notify when customer is created", () => {
    const address = new Address("Street", 10, "00000-000", "City");
    const customer = new Customer("123", "Customer");
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new Log1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new Log2WhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: address.toString(),
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify when customer change address", () => {
    const address = new Address("Street", 10, "00000-000", "City");
    const customer = new Customer("123", "Customer");
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new LogWhenCustomerChangeAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventHandler);

    customer.address = new Address("Street", 20, "11111-111", "City");

    const customerChangedEvent = new CustomerChangeAddressEvent({
      id: customer.id,
      name: customer.name,
      address: address.toString(),
    });

    eventDispatcher.notify(customerChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
