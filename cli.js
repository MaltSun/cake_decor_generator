import inquirer from 'inquirer';
import fs from 'fs';
import { generateImage } from './generateImage.js';

const questions = JSON.parse(fs.readFileSync('./questions.json', 'utf-8'));

async function main() {
  const answers = await inquirer.prompt(
    questions.map(q => ({
      type: 'confirm',
      name: q.tag,
      message: q.question
    }))
  );

  const selectedTags = Object.keys(answers).filter(tag => answers[tag]);
  console.log('Вы выбрали:', selectedTags.join(', '));

  const imageUrl = await generateImage(selectedTags);
  console.log('Картинка сгенерирована:', imageUrl);
}

main();
