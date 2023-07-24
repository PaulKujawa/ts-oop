interface DocumentPrototype {
  clone(): DocumentPrototype;
}

class Document implements DocumentPrototype {
  title = "";

  constructor() {
    console.log("expense creation of document");
  }

  clone(): DocumentPrototype {
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

  clone(): DocumentPrototype {
    // deep clone as documents is a complex type
    return { ...this, documents: this.documents.map((doc) => doc.clone()) };
  }
}

type TPrototypes = "document" | "documentFolder";

class DocumentPrototypeManager {
  private static prototypes = new Map<TPrototypes, DocumentPrototype>();

  static {
    const document = new Document();
    const documentFolder = new DocumentFolder();

    this.prototypes.set("document", document);
    this.prototypes.set("documentFolder", documentFolder);
  }

  static getClone(type: "document"): Document;
  static getClone(type: "documentFolder"): DocumentFolder;
  static getClone(type: TPrototypes) {
    return this.prototypes.get(type)!.clone();
  }
}

const doc1 = DocumentPrototypeManager.getClone("document");
const doc2 = DocumentPrototypeManager.getClone("document");

const folder = DocumentPrototypeManager.getClone("documentFolder");
folder.documents.push(doc1, doc2);

console.log("created 1 folder with 2 (!) documents");

export {};
