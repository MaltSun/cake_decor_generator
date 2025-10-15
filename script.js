//дрквовидная структура для переход амежду вопросами
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

let reasonablenessIndex = 0;
let currentQuestionNode; //новое

function startSurvey(rootNode) {
  // traverseTree(rootNode);
  currentQuestionNode = rootNode;
  showQuestion(currentQuestionNode);
}

// function traverseTree(node) {
//     if (!node) return;

//     const answer = prompt(node.question + "\n(Да/Возможно/Нет/Не знаю):").toLowerCase();

//     let delta;
//     switch (answer) {
//         case "да":
//             delta = 1.0;
//             break;
//         case "возможно":
//             delta = 0.5;
//             break;
//         case "нет":
//             delta = -1.0;
//             break;
//         case "не знаю":
//             delta = 0.0;
//             break;
//         default:
//             delta = 0.0;
//             break;
//     }

//     reasonablenessIndex += delta;

//     node.tags.forEach(tag => {
//         // Логика для обработки тегов
//         console.log(`Тег: ${tag}, Дельта: ${delta}`);
//     });

//     if (answer === "да" || answer === "возможно") {
//         traverseTree(node.yesBranch);
//     } else if (answer === "нет" || answer === "не знаю") {
//         traverseTree(node.noBranch);
//     }
// }

// function showQuestion(node) {
//   document.getElementById("question").textContent = node.question;
//   document
//     .querySelectorAll('input[name="answer"]')
//     .forEach((input) => (input.checked = false));
// }

document.getElementById("next-btn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    let delta;

    switch (answer) {
      case "yes":
        delta = 1.0;
        break;
      case "maybe":
        delta = 0.5;
        break;
      case "no":
        delta = -1.0;
        break;
      case "idk":
        delta = 0.0;
        break;
      default:
        delta = 0.0;
        break;
    }

    reasonablenessIndex += delta;
    currentQuestionNode.tags.forEach((tag) => {
      console.log(`Тег: ${tag}, Дельта: ${delta}`);
    });

    // Переход к следующему вопросу
    if (answer === "yes" && currentQuestionNode.yesBranch) {
      currentQuestionNode = currentQuestionNode.yesBranch;
    } else if (answer === "no" && currentQuestionNode.noBranch) {
      currentQuestionNode = currentQuestionNode.noBranch;
    } else if (answer === "maybe" && currentQuestionNode.yesBranch) {
      currentQuestionNode = currentQuestionNode.yesBranch; // Можно добавить логику для "возможно"
    } else if (answer === "idk" && currentQuestionNode.noBranch) {
      currentQuestionNode = currentQuestionNode.noBranch; // Можно добавить логику для "не знаю"
    } else {
      // Если нет ветки, можно показать сообщение о завершении опроса
      console.log("Опрос завершён или нет доступных вариантов.");
      return;
    }
    // Показываем следующий вопрос
    showQuestion(currentQuestionNode);
  }
});

function showQuestion(node) {
  document.getElementById("question").textContent = node.question;
  document
    .querySelectorAll('input[name="answer"]')
    .forEach((input) => (input.checked = false));
}

async function loadCakes(filePath) {
  const response = await fetch(filePath);
  const cakes = await response.json();
  return cakes.map((cake) => new Cake(cake.id, cake.tags, cake.photo));
}

async function loadDecorElements(filePath) {
  const response = await fetch(filePath);
  const elements = await response.json();
  return elements.map(
    (element) => new DecorElements(element.question, element.tag, element.index)
  );
}

async function init() {
  // const cakes = await loadCakes('data.json');
  // const decorElements = await loadDecorElements('decorElements.json');

  // const firstRoot = createFirstTreeRoot(); // Функция создания корня дерева

  // startSurvey(firstRoot);

  const cakes = await loadCakes("./data.json");
  const decorElements = await loadDecorElements("./decorElements.json");

  const firstRoot = createFirstTreeRoot();

  showQuestion(currentQuestionNode);
}

document.addEventListener("DOMContentLoaded", init);

function createFirstTreeRoot() {
  const firstRoot = new QuestionNode(
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
  firstRoot.yesBranch.noBranch = secondTreeRoot();
  firstRoot.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.yesBranch.yesBranch = secondTreeRoot();
  firstRoot.yesBranch.noBranch.yesBranch = secondTreeRoot();
  firstRoot.yesBranch.yesBranch.noBranch.yesBranch = secondTreeRoot();
  firstRoot.yesBranch.yesBranch.noBranch.noBranch = secondTreeRoot();
  //
  firstRoot.noBranch = new QuestionNode("Вам нравятся квадратные торты?", [
    "square_shape",
  ]);
  firstRoot.noBranch.yesBranch = new QuestionNode(
    "Предпочли бы высокий вытянутый торт?",
    ["tall"]
  );
  firstRoot.noBranch.noBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.noBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Вы хотите одноярусный торт?",
    ["single_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.yesBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.yesBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.noBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.noBranch = new QuestionNode(
    "Вам нравятся торты необычной формы (например, сердце, цифра, геометрия)?",
    ["unique_shape"]
  );
  firstRoot.noBranch.yesBranch.noBranch.noBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.noBranch.yesBranch = new QuestionNode(
    "Предпочли бы высокий вытянутый торт?",
    ["tall"]
  );
  firstRoot.noBranch.yesBranch.noBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Вы хотите одноярусный торт?",
    ["single_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.yesBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "В вашем торте может быть фальш-ярус?",
    ["fake_tier"]
  );
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.yesBranch = secondTreeRoot();
  firstRoot.noBranch.yesBranch.yesBranch.noBranch.noBranch = secondTreeRoot();
  return firstRoot;
}

function secondTreeRoot() {
  const secondRoot = new QuestionNode("Торт для дня рождения?", ["birthday"]);

  secondRoot.yesBranch = new QuestionNode("Этот торт для ребёнка?", ["child"]);//
  secondRoot.yesBranch.yesBranch = new QuestionNode(
    "Торт должен соответствовать конкретной тематике?",
    ["themed_cake"]
  );

 secondRoot.yesBranch.yesBranch.noBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
    "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
    ["nature_cake"]
  );

secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
    "Торт для охотника?",
    ["hunter"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.yesBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "Торт для рыбака?",
    ["fisherman"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch.noBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch.yesBranch = thirdTreeRoot();

secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "Торт для футбольного фаната?",
    ["football_fan"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.yesBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
    "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
    ["movie_inspired"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.yesBranch= thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
    "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
    ["brand_style"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch.yesBranch= thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch.noBranch= thirdTreeRoot();

  secondRoot.noBranch = new QuestionNode(
    "Этот торт для свадьбы или годовщины?",
    ["themed_cake"]
  );
  secondRoot.yesBranch.noBranch = new QuestionNode(
    "Торт для женщины?",
    ["women"]
  ); 
   secondRoot.yesBranch.yesBranch = new QuestionNode(
    "Торт должен соответствовать конкретной тематике?",
    ["themed_cake"]
  );

 secondRoot.yesBranch.yesBranch.noBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch = new QuestionNode(
    "Торт должен быть вдохновлён природой (горный, лесной, морской стиль)?",
    ["nature_cake"]
  );

secondRoot.yesBranch.yesBranch.yesBranch.yesBranch = new QuestionNode(
    "Торт для охотника?",
    ["hunter"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.yesBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "Торт для рыбака?",
    ["fisherman"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch.noBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.yesBranch.noBranch.yesBranch = thirdTreeRoot();

secondRoot.yesBranch.yesBranch.yesBranch.noBranch = new QuestionNode(
    "Торт для футбольного фаната?",
    ["football_fan"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.yesBranch = thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch = new QuestionNode(
    "Хотите торт, вдохновлённый вашим любимым фильмом, сериалом или мультфильмом?",
    ["movie_inspired"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.yesBranch= thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
    "Нравятся торты в стиле известных брендов (например, Chanel, Louis Vuitton, Gucci)?",
    ["brand_style"]
  );
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch.yesBranch= thirdTreeRoot();
secondRoot.yesBranch.yesBranch.yesBranch.noBranch.noBranch.noBranch.noBranch= thirdTreeRoot();

  secondRoot.noBranch.yesBranch = thirdTreeRoot();

  secondRoot.noBranch.noBranch = new QuestionNode(
    "Это торт для сообщения какой-то новости?",
    ["news_announcement"]
  );
  secondRoot.noBranch.noBranch.noBranch = thirdTreeRoot();

  secondRoot.noBranch.noBranch.yesBranch = new QuestionNode(
    "Это торт для предложения?",
    ["proposal"]
  );
  secondRoot.noBranch.noBranch.yesBranch.yesBranch = thirdTreeRoot();
  secondRoot.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
    "Это гендерный торт?",
    ["gender_reveal"]
  );
  secondRoot.noBranch.noBranch.yesBranch.noBranch.noBranch = thirdTreeRoot();
  secondRoot.noBranch.noBranch.yesBranch.noBranch.yesBranch = thirdTreeRoot();

  return secondRoot;
}

function thirdTreeRoot() {
  const thirdRoot = new QuestionNode(
    "Надпись на самом торте — важный элемент?",
    ["inscription_on_cake"]
  );

  thirdRoot.yesBranch = new QuestionNode(
    "Нравятся торты с тайным посланием (сжигается верхний слой)?",
    ["secret_message"]
  );
  thirdRoot.yesBranch.yesBranch = forthTreeRoot();
  thirdRoot.yesBranch.noBranch = new QuestionNode(
    "Топпер — обязательный элемент для вашего торта?",
    ["topper"]
  );
  thirdRoot.yesBranch.noBranch.noBranch = forthTreeRoot();
  thirdRoot.yesBranch.noBranch.yesBranch = new QuestionNode(
    "Хотите украсить торт топпером сверху?",
    ["topper_on_top"]
  );
  thirdRoot.yesBranch.noBranch.yesBranch.yesBranch = forthTreeRoot();
  thirdRoot.yesBranch.noBranch.yesBranch.noBranch = new QuestionNode(
    "Предпочитаете топпер, закреплённый сбоку?",
    ["topper_on_side"]
  );
  thirdRoot.yesBranch.noBranch.yesBranch.noBranch.yesBranch = forthTreeRoot();
  thirdRoot.yesBranch.noBranch.yesBranch.noBranch.noBranch = forthTreeRoot();
  // thirdRoot.yesBranch.noBranch.noBranch = forthTreeRoot();
  //
  thirdRoot.noBranch = new QuestionNode(
    "Хотели бы разместить фотографию виновника торжества на торте?",
    ["photo_on_cake"]
  );
  thirdRoot.noBranch.noBranch = forthTreeRoot();
  thirdRoot.noBranch.yesBranch = new QuestionNode(
    "Торт должен быть шуточный?",
    ["funny_cake"]
  );

  thirdRoot.noBranch.yesBranch.yesBranch = forthTreeRoot();
  thirdRoot.noBranch.yesBranch.noBranch = forthTreeRoot();

  return thirdRoot;
}

function forthTreeRoot() {
  const forthRoot = new QuestionNode(
    "Хотите, чтобы торт выглядел 'дорого' и роскошно?",
    ["luxurious"]
  );

  forthRoot.yesBranch = new QuestionNode(
    "Хотите, чтобы декор был насыщенным и детализированным?",
    ["detailed_decor"]
  );

  forthRoot.yesBranch.yesBranch = new QuestionNode(
    "Хотите торт в стиле ламбет (объемный, с рюшами и узорами)?",
    ["lambert"]
  );

  forthRoot.yesBranch.noBranch = new QuestionNode(
    "Нравится, когда торт расписан узорами или рисунками?",
    ["detailed_decor"]
  );

  forthRoot.yesBranch.noBranch.noBranch = new QuestionNode(
    "Вам ближе нежные пастельные оттенки?",
    ["pastel_colors"]
  );

  forthRoot.yesBranch.noBranch.noBranch.yesBranch = new QuestionNode(
    "Хотите, чтобы торт был белым?",
    ["white"]
  );

  forthRoot.yesBranch.noBranch.noBranch.noBranch = new QuestionNode(
    "Нравятся яркие, сочные цвета в оформлении?",
    ["bright_colors"]
  );

  forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
    "Предпочитаете глубокие, тёмные тона?",
    ["dark_colors"]
  );

  forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Предпочитаете чёрный торт?",
    ["black"]
  );

  forthRoot.noBranch = new QuestionNode(
    "Вам по душе минималистичный стиль?",
    ["minimalism"]
  );

  forthRoot.noBranch.yesBranch = new QuestionNode(
    "Вам ближе нежные пастельные оттенки?",
    ["pastel_colors"]
  );

  forthRoot.noBranch.yesBranch.yesBranch = new QuestionNode(
    "Хотите, чтобы торт был белым?",
    ["white"]
  );

  forthRoot.noBranch.noBranch = new QuestionNode(
    "Предпочитаете однотонное оформление торта?",
    ["solid_color"]
  );

  forthRoot.noBranch.noBranch.yesBranch = new QuestionNode(
    "Хотите торт с бархатным (велюровым) покрытием?",
    ["velvet"]
  );

  forthRoot.noBranch.noBranch.noBranch = new QuestionNode(
    "Хотите торт в стиле 'голый торт' (naked cake) с минимальным покрытием?",
    ["naked"]
  );

  forthRoot.noBranch.noBranch.noBranch.noBranch = new QuestionNode(
    "Нравятся зеркальные (глянцевые) глазури?",
    ["mirror_glaze"]
  );

  forthRoot.noBranch.noBranch.noBranch.yesBranch = new QuestionNode(
    "Хотите, чтобы торт был украшен мраморным эффектом?",
    ["marble_effect"]
  );

  forthRoot.noBranch.noBranch.noBranch.yesBranch.noBranch = new QuestionNode(
    "Хотите, чтобы торт был с эффектом омбре (плавный переход цвета)?",
    ["ombre"]
  );

 forthRoot.noBranch.noBranch.noBranch.yesBranch.noBranch.noBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };
 forthRoot.noBranch.noBranch.noBranch.yesBranch.noBranch.yesBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

  forthRoot.noBranch.yesBranch.yesBranch.noBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };
forthRoot.noBranch.yesBranch.yesBranch.yesBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

    forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch.yesBranch.noBranch= async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

   forthRoot.yesBranch.noBranch.noBranch.noBranch.yesBranch.yesBranch.yesBranch= async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

    forthRoot.noBranch.noBranch.yesBranch.yesBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

  forthRoot.noBranch.noBranch.noBranch.yesBranch = async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

   forthRoot.noBranch.noBranch.noBranch.noBranch.yesBranch =  async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };

   forthRoot.noBranch.noBranch.noBranch.noBranch.noBranch =  async () => {
    const decorElements = await loadDecorElements("./decorElements.json");
    // Logic to show decor elements
    console.log(decorElements); // Replace with actual display logic
  };


  return forthRoot;
}

async function loadDecorElements(filePath) {
  const response = await fetch(filePath);
  const elements = await response.json();
  return elements.map(
    (element) => new DecorElements(element.question, element.tag, element.index)
  );
}

function calculateReasonablenessIndex(decorElements, tagWeights) {
  let repeatCount = 0;
  const questionRanges = [11, 9, 10];
  let startIndex = 0;

  for (
    let round = 0;
    round < questionRanges.length &&
    reasonablenessIndex > 0 &&
    repeatCount <= 2;
    round++
  ) {
    const questionCount = questionRanges[round];

    for (
      let i = startIndex;
      i < startIndex + questionCount && i < decorElements.length;
      i++
    ) {
      const answer = prompt(
        decorElements[i].question + "\n(Да/Возможно/Нет/Не знаю):"
      ).toLowerCase();

      let delta;
      switch (answer) {
        case "да":
          delta = -decorElements[i].index;
          break;
        case "возможно":
          delta = -decorElements[i].index * 0.5;
          break;
        default:
          delta = 0.0;
      }

      reasonablenessIndex += delta;

      if (decorElements[i].tag) {
        if (!tagWeights[decorElements[i].tag]) {
          tagWeights[decorElements[i].tag] = 0.0;
        }
        tagWeights[decorElements[i].tag] += -delta / decorElements[i].index;
      }

      if (reasonablenessIndex <= 0) return;
    }

    startIndex += questionCount;

    if (reasonablenessIndex > 0 && round < questionRanges.length - 1) {
      const continueAnswer = prompt(
        "\nХотите продолжить уточнение по декору?\n(Да/Возможно/Нет/Не знаю):"
      ).toLowerCase();
      if (continueAnswer === "да" || continueAnswer === "возможно") {
        repeatCount++;
      } else {
        break;
      }
    }
  }
}

function recommendCakes(cakes, tagProbabilities) {
  const cakeProbabilities = {};

  cakes.forEach((cake) => {
    let score = 0;
    cake.tags.forEach((tag) => {
      if (tagProbabilities[tag]) {
        score += tagProbabilities[tag];
      }
    });
    cakeProbabilities[cake.id] = score / cake.tags.length;
  });

  printCakes(cakeProbabilities, cakes);
}

function printCakes(cakeProbabilities, cakes) {
  const topCakes = Object.entries(cakeProbabilities)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  console.log("\nРекомендуемые торты:");
  topCakes.forEach(([id, probability]) => {
    const cakeInfo = cakes.find((cake) => cake.id === parseInt(id));
    console.log(
      `ID: ${cakeInfo.id}, Вероятность: ${probability.toFixed(2)}, Ссылка: ${
        cakeInfo.photo
      }`
    );
  });
}

async function init() {
  const cakes = await loadCakes("data.json");
  const decorElements = await loadDecorElements("decorElements.json");

  const firstRoot = createFirstTreeRoot();
  startSurvey(firstRoot);
  
  calculateReasonablenessIndex(decorElements, tagProbabilities);

  const tagProbabilities = calculateTagProbabilities(tagWeights); // Рассчитываем вероятности тегов
  recommendCakes(cakes, tagProbabilities);
}

function calculateTagProbabilities(tagWeights) {
  const totalTags = Object.keys(tagWeights).length;
  const result = {};

  for (const [tag, weight] of Object.entries(tagWeights)) {
    const probability = (weight + 1) / 2; // Преобразование веса в вероятность
    result[tag] = probability;
  }

  return result;
}
