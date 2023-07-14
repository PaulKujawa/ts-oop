class DocsOriginator {
  private docsId: number;
  private docsName: string;

  constructor(docsId: number, docsName: string) {
    this.docsId = docsId;
    this.docsName = docsName;
  }

  getDocsId() {
    return this.docsId;
  }

  setDocsId(docsId: number) {
    this.docsId = docsId;
  }

  getDocsName() {
    return this.docsName;
  }

  setDocsName(docsName: string) {
    this.docsName = docsName;
  }

  saveToMemento() {
    return new DocsMemento(this.docsId, this.docsName);
  }

  undoFromMemento(memento: DocsMemento) {
    this.docsId = memento.getDocsId();
    this.docsName = memento.getDocsName();
  }

  printInfo() {
    console.log(`ID: ${this.docsId}, Name: ${this.docsName}`);
  }
}

class DocsMemento {
  private docsId: number;
  private docsName: string;

  constructor(docsId: number, docsName: string) {
    this.docsId = docsId;
    this.docsName = docsName;
  }
  getDocsId() {
    return this.docsId;
  }

  getDocsName() {
    return this.docsName;
  }

  toString() {
    return `Current Memento State ${this.docsId}, ${this.docsName}`;
  }
}

class DocsCaretaker {
  mementos: DocsMemento[] = [];

  constructor(memento: DocsMemento) {
    this.addMemento(memento);
  }

  getMemento() {
    return this.mementos.pop();
  }

  addMemento(memento: DocsMemento) {
    this.mementos.push(memento);
  }
}

const docsOriginator = new DocsOriginator(306, "Mark Ferguson");
const docsCaretaker = new DocsCaretaker(docsOriginator.saveToMemento());
console.log("Original DocsOriginator");
docsOriginator.printInfo();

console.log("DocsOriginator after updating name");
docsOriginator.setDocsName("John Doe");
docsCaretaker.addMemento(docsOriginator.saveToMemento());
docsOriginator.printInfo();

console.log("Original DocsOriginator after undoing name update");
docsOriginator.undoFromMemento(docsCaretaker.getMemento()!);
docsOriginator.undoFromMemento(docsCaretaker.getMemento()!);
docsOriginator.printInfo();
