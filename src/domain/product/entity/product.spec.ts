import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should create a new product with success", () => {
    const product = new Product("123", "Product 1", 100);
    expect(product.validate()).toBeTruthy();
  });

  it("should be able to change product name", () => {
    const product = new Product("123", "Produtinho", 200);
    product.changeName("Produtinho Top");
    expect(product.name).toBe("Produtinho Top");
  });

  it("should throw error when change product name", () => {
    expect(() => {
      const product = new Product("123", "Produtinho", 200);
      product.changeName("");
    }).toThrowError("Product name is required");
  });

  it("should be able to change price", () => {
    const product = new Product("123", "Produtinho", 200);
    product.changePrice(100);
    expect(product.price).toBe(100);
  });

  it("should throw error when change price", () => {
    expect(() => {
      const product = new Product("123", "Produtinho", 200);
      product.changePrice(0);
    }).toThrowError("Price is required");
  });
});
