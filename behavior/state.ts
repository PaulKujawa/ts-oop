// "State" components
interface CandyVendingMachineState {
  insertCoin(): void;
  pressButton(): void;
  dispense(): void;
  toString(): string;
}

class NoCoinState implements CandyVendingMachineState {
  machine: CandyVendingMachine;

  constructor(machine: CandyVendingMachine) {
    this.machine = machine;
  }

  insertCoin() {
    this.machine.setState(this.machine.getContainsCoinState());
  }

  pressButton() {
    console.log("No coin inserted");
  }

  dispense() {}

  toString() {
    return "NoCoinState";
  }
}

class ContainsCoinState implements CandyVendingMachineState {
  machine: CandyVendingMachine;

  constructor(machine: CandyVendingMachine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("Coin already inserted");
  }

  pressButton() {
    this.machine.setState(this.machine.getDispensedState());
  }

  dispense() {}

  toString() {
    return "ContainsCoinState";
  }
}

class DispensedState implements CandyVendingMachineState {
  machine: CandyVendingMachine;

  constructor(machine: CandyVendingMachine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("Button already pressed");
  }

  pressButton() {
    console.log("Button already pressed");
  }

  dispense() {
    if (this.machine.getCount() > 0) {
      console.log("Candy dispensed");

      this.machine.setState(this.machine.getNoCoinState());
      this.machine.setCount(this.machine.getCount() - 1);
    } else {
      console.log("No candies available");

      this.machine.setState(this.machine.getNoCandyState());
    }
  }

  toString() {
    return "DispensedState";
  }
}

class NoCandyState implements CandyVendingMachineState {
  machine: CandyVendingMachine;

  constructor(machine: CandyVendingMachine) {
    this.machine = machine;
  }

  insertCoin() {
    console.log("No candies available");
  }

  pressButton() {
    console.log("No candies available");
  }

  dispense() {}

  toString() {
    return "NoCandyState";
  }
}

// "Context" component
class CandyVendingMachine {
  private noCoinState: CandyVendingMachineState;
  private noCandyState: CandyVendingMachineState;
  private dispensedState: CandyVendingMachineState;
  private containsCoinState: CandyVendingMachineState;
  private state: CandyVendingMachineState;
  private count: number;

  constructor(numberOfCandies: number) {
    this.count = numberOfCandies;
    this.noCoinState = new NoCoinState(this);
    this.noCandyState = new NoCandyState(this);
    this.dispensedState = new DispensedState(this);
    this.containsCoinState = new ContainsCoinState(this);
    this.state = this.noCoinState;
  }

  insertCoin() {
    console.log("Coin inserted");

    this.state.insertCoin();
  }

  pressButton() {
    console.log("Button pressed");

    this.state.pressButton();
    this.state.dispense();
  }

  // setter & getter below

  getCount() {
    return this.count;
  }

  setCount(count: number) {
    this.count = count;
  }

  getState(): CandyVendingMachineState {
    return this.state;
  }

  setState(state: CandyVendingMachineState) {
    this.state = state;
  }

  getNoCandyState(): CandyVendingMachineState {
    return this.noCandyState;
  }

  setNoCandyState(noCandyState: CandyVendingMachineState) {
    this.noCandyState = noCandyState;
  }

  getNoCoinState(): CandyVendingMachineState {
    return this.noCoinState;
  }

  setNoCoinState(noCoinState: CandyVendingMachineState) {
    this.noCoinState = noCoinState;
  }

  getContainsCoinState(): CandyVendingMachineState {
    return this.containsCoinState;
  }

  setContainsCoinState(containsCoinState: CandyVendingMachineState) {
    this.containsCoinState = containsCoinState;
  }

  getDispensedState(): CandyVendingMachineState {
    return this.dispensedState;
  }

  setDispensedState(dispensedState: CandyVendingMachineState) {
    this.dispensedState = dispensedState;
  }

  toString() {
    return `Current state of machine ${this.state}. ${this.count} candies available`;
  }
}

const candyVendorMachine = new CandyVendingMachine(1);

console.log("// happy case");
candyVendorMachine.insertCoin();
candyVendorMachine.pressButton();

console.log("// broken case");
candyVendorMachine.pressButton();
