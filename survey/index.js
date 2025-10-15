import SurveyEngine from './SurveyEngine.js';
import ResultGenerator from './ResultGenerator.js';

const survey = new SurveyEngine('./questions.json');

let question;
while (question = survey.getNextQuestion()) {
  console.log(question.question);
  survey.answerCurrent(true); // Для примера все ответы "Да"
}

const resultTags = survey.getResultTags();
console.log('Теги для генерации картинки:', resultTags);

(async () => {
  const imageFile = await ResultGenerator.generate(resultTags);
  console.log('Сгенерированная картинка сохранена в:', imageFile);
})();
