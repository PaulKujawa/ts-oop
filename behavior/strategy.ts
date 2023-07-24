interface PaymentStrategy {
  processPayment(amount: number): void;
}

class PayPalPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Paid ${amount} via PayPal.`);
  }
}

class CreditCardPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Paid ${amount} via Credit Card.`);
  }
}

class ApplePayPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number) {
    console.log(`Paid ${amount} via ApplePay.`);
  }
}

class PaymentProvider {
  private paymentStrategy: PaymentStrategy;

  constructor(paymentStrategy: PaymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }

  processPayment(amount: number): void {
    this.paymentStrategy.processPayment(amount);
  }
}

const paymentProvider = new PaymentProvider(new PayPalPaymentStrategy());
paymentProvider.processPayment(100);
