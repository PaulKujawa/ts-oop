interface DocumentPrototype {
  clone(): this;
}

class Document implements DocumentPrototype {
  title = "";

  constructor() {
    console.log("expense creation of document");
  }

  clone(): this {
    // since this class has only fields of primitive type
    // a shallow cloning is sufficient
    return { ...this };
  }
}

class DocumentFolder implements DocumentPrototype {
  title = "";
  documents: Document[] = [];

  constructor() {
    console.log("expense creation of documentFolder");
  }

  clone(): this {
    // deep clone as documents is a complex type
    return { ...this, documents: this.documents.map((doc) => doc.clone()) };
  }
}

class DocumentPrototypeManager {
  private static prototypes = {
    document: new Document(),
    documentFolder: new DocumentFolder(),
  };

  static getClone<TKey extends keyof typeof this.prototypes>(type: TKey) {
    return this.prototypes[type].clone() as (typeof this.prototypes)[TKey];
  }
}

const doc1 = DocumentPrototypeManager.getClone("document");
const doc2 = DocumentPrototypeManager.getClone("document");

const folder = DocumentPrototypeManager.getClone("documentFolder");
folder.documents.push(doc1, doc2);

console.log("created 1 folder with 2 (!) documents");

export {};
