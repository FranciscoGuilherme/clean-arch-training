import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }

    return true;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }

  changeName(name: string) {
    if (name.length === 0) {
      throw new Error("Product name is required");
    }

    this._name = name;
  }

  changePrice(price: number) {
    if (price === 0) {
      throw new Error("Price is required");
    }

    this._price = price;
  }
}
