/*
 * File defines first reusable types,
 * and then conrete implementations,
 * with the idea of an audition of products and bidders,
 * finished with a client usage.
 */

class Observable {
  #observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    this.#observers.push(observer);
  }

  public deleteObserver(observer: Observer): void {
    this.#observers.filter((obs) => obs !== observer);
  }

  protected notifyObservers(value: unknown): void {
    this.#observers.forEach((observer) => observer.update(this, value));
  }
}

interface Observer {
  update(observable: Observable, value: unknown): void;
}

// Concrete Implementation below

class Product extends Observable {
  name: string;
  #price: number;

  constructor(name: string, price: number) {
    super();
    this.name = name;
    this.#price = price;
  }

  raiseBid(bidPrice: number): void {
    if (this.#price < bidPrice) {
      console.log(`bid of ${this.name} was raised to ${bidPrice}.`);

      this.#price = bidPrice;
      this.notifyObservers(bidPrice);
    }
  }
}

class Bidder implements Observer {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  // in theory the types can not be said for so sure, as Bidder could be
  // passed to other Observables, too.
  update(product: Product, value: number): void {
    console.log(
      `${this.#name} was informed about the new price of ${value} for ${
        product.name
      }`
    );
  }
}

// Client Usage below

const bidderTom = new Bidder("Tom");
const bidderLeo = new Bidder("Leo");

const product1 = new Product("macbook", 200);
product1.addObserver(bidderTom);

const product2 = new Product("lamp", 20);
product2.addObserver(bidderTom);
product2.addObserver(bidderLeo);

product1.raiseBid(250);
product2.raiseBid(50);

export {};
