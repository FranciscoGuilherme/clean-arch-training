import Order from "../../../../domain/checkout/entity/order";
import OrderInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity
      })),
      total: entity.total(),
    },
    {
      include: [{ model: OrderItemModel }]
    });
  }

  async update(entity: Order): Promise<void> {
    throw new Error("");
  }

  async find(id: string): Promise<Order> {
    throw new Error("");
  }

  async findAll(): Promise<Order[]> {
    throw new Error("");
  }
}
