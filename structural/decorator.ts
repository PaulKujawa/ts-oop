abstract class Car {
  protected description = "Car";

  getDescription() {
    return this.description;
  }

  abstract cost(): number;
}

// Concrete Implementation below
class Porsche extends Car {
  constructor() {
    super();
    this.description = "Porsche";
  }

  cost() {
    return 80;
  }
}

class Ferari extends Car {
  constructor() {
    super();
    this.description = "Ferari";
  }
  cost() {
    return 90;
  }
}

// Decorators below
abstract class CarDecorator extends Car {
  abstract override getDescription(): string;
}

class TintedWindows extends CarDecorator {
  car: Car;

  constructor(car: Car) {
    super();
    this.car = car;
  }

  getDescription() {
    return this.car.getDescription() + ", tinted windows";
  }

  cost() {
    return this.car.cost() + 2;
  }
}

class SportVersion extends CarDecorator {
  car: Car;

  constructor(car: Car) {
    super();
    this.car = car;
  }

  getDescription() {
    return this.car.getDescription() + ", sport version";
  }

  cost() {
    return this.car.cost() + 3;
  }
}

// Usage below
const pimpedPorsche = new TintedWindows(new SportVersion(new Porsche()));

console.log(`${pimpedPorsche.getDescription()} costs ${pimpedPorsche.cost()}`);
