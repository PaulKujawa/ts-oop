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
class GermanBankAdapter extends GermanBank implements Bank {
  transfer(amount: number) {
    return this.überweisen(amount);
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

const germanBankAdapter = new GermanBankAdapter();
germanBankAdapter.transfer(amount); // here we don't need to use `überweisen`

export {};
