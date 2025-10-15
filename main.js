import { loadCakes, loadDecorElements } from "./dataLoader.js";
import { startSurvey, nextQuestion, reasonablenessIndex } from "./survey.js";
import { recommendCakes, calculateTagProbabilities } from "./recommendation.js";
import { generatePrompts } from "./generation.js";
import { createFirstTreeRoot } from "./treeBuilder.js"; // нужно перенести функции создания дерева сюда

let tagWeights = {};

async function init() {
  const cakes = await loadCakes("data.json");
  const decorElements = await loadDecorElements("decorElements.json");

  const firstRoot = createFirstTreeRoot();
  startSurvey(firstRoot, showQuestion);

  document.getElementById("next-btn").addEventListener("click", () => {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) return;

    const alive = nextQuestion(selected.value, showQuestion);
    if (!alive) {
      const tagProbabilities = calculateTagProbabilities(tagWeights);
      const topCakes = recommendCakes(cakes, tagProbabilities);
      console.log("Рекомендуемые торты:", topCakes);

      const topTags = Object.keys(tagProbabilities).sort((a,b)=>tagProbabilities[b]-tagProbabilities[a]).slice(0,5);
      document.getElementById("generated-prompts").innerHTML = generatePrompts(topTags).join("<br>");
    }
  });
}

function showQuestion(node) {
  document.getElementById("question").textContent = node.question;
  document.querySelectorAll('input[name="answer"]').forEach(input => input.checked = false);
}

document.addEventListener("DOMContentLoaded", init);
