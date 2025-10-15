import { QuestionNode } from "./models.js";

export let currentQuestionNode;
export let reasonablenessIndex = 0;

export function startSurvey(rootNode, showQuestionCallback) {
  currentQuestionNode = rootNode;
  showQuestionCallback(currentQuestionNode);
}

export function nextQuestion(answer, showQuestionCallback) {
  let delta;
  switch (answer) {
    case "yes": delta = 1; break;
    case "maybe": delta = 0.5; break;
    case "no": delta = -1; break;
    case "idk": delta = 0; break;
    default: delta = 0;
  }

  reasonablenessIndex += delta;
  currentQuestionNode.tags.forEach(tag => console.log(`Тег: ${tag}, Дельта: ${delta}`));

  if ((answer === "yes" || answer === "maybe") && currentQuestionNode.yesBranch) {
    currentQuestionNode = currentQuestionNode.yesBranch;
  } else if ((answer === "no" || answer === "idk") && currentQuestionNode.noBranch) {
    currentQuestionNode = currentQuestionNode.noBranch;
  } else {
    return false; // опрос завершён
  }

  showQuestionCallback(currentQuestionNode);
  return true;
}
