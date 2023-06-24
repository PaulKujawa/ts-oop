/*
 * Separates request of something and its creation,
 * like ordering a pizza without being involved in its creation.
 */

abstract class Pizza {
  abstract prepare(): void;

  bake(): void {
    console.log("baking pizza");
  }
}

class TunaPizza extends Pizza {
  prepare(): void {
    console.log("preparing cheese pizza.");
  }
}

class PepperoniPizza extends Pizza {
  prepare(): void {
    console.log("preparing pepperoni pizza.");
  }
}

class VeggiePizza extends Pizza {
  prepare(): void {
    console.log("preparing veggie pizza.");
  }
}

class PizzaFactory {
  // factory method
  createPizza(liking: "seafood" | "spicy" | "veggie"): Pizza {
    let pizza: Pizza;

    switch (liking.toLowerCase()) {
      case "seafood":
        pizza = new TunaPizza();
        break;
      case "spicy":
        pizza = new PepperoniPizza();
        break;
      case "veggie":
        pizza = new VeggiePizza();
        break;
      default:
        throw new Error("No such pizza.");
    }

    pizza.prepare();
    pizza.bake();

    return pizza;
  }
}

const pizzaFactory = new PizzaFactory();
const pizza: Pizza = pizzaFactory.createPizza("spicy");
