/*
 * File demonstrates idea of adapting a 3rd party API.
 */

// adaptee
class GermanBank {
  // silly German API, that we don't want
  überweisen(amount: number) {
    console.log(`${amount} überwiesen`);
  }
}

// adapter
class GermanBankAdapter implements Bank {
  private bank: GermanBank;

  constructor(bank: GermanBank) {
    this.bank = bank;
  }

  transfer(amount: number) {
    return this.bank.überweisen(amount);
  }
}

// target
interface Bank {
  transfer(amount: number): void;
}

class AmericanBank implements Bank {
  transfer(amount: number) {
    console.log(`transfered ${amount}`);
  }
}

const amount = 42;
const americanBank = new AmericanBank();
americanBank.transfer(amount);

const germanBank = new GermanBank();
const germanBankAdapter = new GermanBankAdapter(germanBank);
germanBankAdapter.transfer(amount); // here we don't need to use `überweisen`

export {};
