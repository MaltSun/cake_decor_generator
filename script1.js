//главный корень откуда начинается опрос
class QuestionNode {
  constructor(question, tags = []) {
    this.question = question;
    this.tags = tags;
    this.yesBranch = null;
    this.noBranch = null;
  }
}

class Cake {
  constructor(id, tags, photo) {
    this.id = id;
    this.tags = tags;
    this.photo = photo;
  }
}

class DecorElements {
  constructor(question, tag, index) {
    this.question = question;
    this.tag = tag;
    this.index = index;
  }
}
var reasonablenessIndex = 0;

function main() {
  var firstRoot = new QuestionNode(
    "Предпочитаете классическую круглую форму?",
    ["round_shape"]
  );
  firstRoot.yesBranch = new QuestionNode(
    "Предпочли бы высокий вытянутый торт?",
    ["tall"]
  );
  firstRoot.yesBranch.yesBranch = new QuestionNode(
    "Вы хотите одноярусный торт?",
    ["single_tier"]
  );
  firstRoot.yesBranch.yesBranch.yesBranch = SecondTreeRoot(); // Assuming SecondTreeRoot() is defined
  firstRoot.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.yesBranch.yesBranch.noBranch.yesBranch = SecondTreeRoot();
  firstRoot.yesBranch.yesBranch.noBranch.noBranch = SecondTreeRoot();

  firstRoot.noBranch = new QuestionNode("Вам нравятся квадратные торты?", [
    "square_shape",
  ]);
  firstRoot.noBranch.yesBranch = new QuestionNode(
    "Предпочли бы высокий вытянутый торт?",
    ["tall"]
  );
  firstRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Вы хотите одноярусный торт?",
    ["single_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.yesBranch = SecondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.yesBranch = SecondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.noBranch = SecondTreeRoot();

  firstRoot.noBranch.noBranch = new QuestionNode(
    "Вам нравятся торты необычной формы (например, сердце, цифра, геометрия)?",
    ["unique_shape"]
  );
  firstRoot.noBranch.noBranch.yesBranch = new QuestionNode(
    "Предпочли бы высокий вытянутый торт?",
    ["tall"]
  );
  firstRoot.noBranch.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Вы хотите одноярусный торт?",
    ["single_tier"]
  );
  firstRoot.noBranch.noBranch.yesBranch.yesBranch.yesBranch = SecondTreeRoot();
  firstRoot.noBranch.noBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.noBranch.noBranch.yesBranch.yesBranch.noBranch.yesBranch =
    SecondTreeRoot();
  firstRoot.noBranch.noBranch.yesBranch.yesBranch.noBranch.noBranch =
    SecondTreeRoot();
  firstRoot.noBranch.noBranch.noBranch = SecondTreeRoot();
}
