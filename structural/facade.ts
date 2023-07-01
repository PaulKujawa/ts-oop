/*
 * Example of a web client requesting an eCommerce order.
 * A facade is used to hide the involved BE services and correct order of messaging.
 */

class Product {
  public id: string;
  attr: any;

  constructor(id: string) {
    this.id = id;
  }
}

class InventoryService {
  static isInStock(product: Product) {
    return true;
  }
}

class PaymentService {
  static makePayment() {
    return true;
  }
}

class ShippingService {
  static shipProduct(product: Product) {
    return true;
  }
}

class OrderServiceFacade {
  static placeOrder(productId: string) {
    const product = new Product(productId);

    if (!InventoryService.isInStock(product)) {
      console.log("product's not in stock");
      return false;
    }

    if (!PaymentService.makePayment()) {
      console.log("payment unsuccessful");
      return false;
    }

    if (!ShippingService.shipProduct(product)) {
      console.log("shipment not possible.");
      return;
    }

    console.log("order was successful and shipment is being processed.");
  }
}

// client code below
OrderServiceFacade.placeOrder("42");
