import Product from "../product/entity/product";

export default class ProductService {
  static increasePrice(products: Product[], percentage: number): Product[] {
    return products.map(product => {
      product.changePrice(product.price + (product.price * percentage / 100));
      return product;
    });
  }
}
