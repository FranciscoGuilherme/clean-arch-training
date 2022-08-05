import Entity from "../../@shared/entity/entity.abstract";
import Address from "../value-object/address";

export default class Customer extends Entity {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewarPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new Error(this.notification.messages());
    }
  }

  validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required"
      });
    }

    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required"
      });
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get active(): boolean {
    return this._active;
  }

  get rewardPoints(): number {
    return this._rewarPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to active a customer");
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewarPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }
}
