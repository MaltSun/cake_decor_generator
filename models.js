export class QuestionNode {
  constructor(question, tags = []) {
    this.question = question;
    this.tags = tags;
    this.yesBranch = null;
    this.noBranch = null;
  }
}

export class Cake {
  constructor(id, tags, photo) {
    this.id = id;
    this.tags = tags;
    this.photo = photo;
  }
}

export class DecorElements {
  constructor(question, tag, index) {
    this.question = question;
    this.tag = tag;
    this.index = index;
  }
}
