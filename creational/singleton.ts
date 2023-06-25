// Lazy instantiation
class Sentry {
  private static instance: Sentry;

  // made private to enforce using static method of instiation only
  private constructor() {
    console.log("Sentry initialised");
  }

  static getInstance(): Sentry {
    if (!this.instance) {
      this.instance = new Sentry();
    }

    return this.instance;
  }
}

// eagier instantiation
class Datadog {
  private static instance = new Datadog();

  // made private to enforce using static method of instiation only
  private constructor() {
    console.log("Datadog initialised");
  }

  static getInstance() {
    return Datadog.instance;
  }
}

const sentry1 = Sentry.getInstance();
const sentry2 = Sentry.getInstance();

const datadog1 = Datadog.getInstance();
const datadog2 = Datadog.getInstance();
